import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = '127.0.0.1';
const PORT = 8832;
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const clients = new Set();
let sequence = 0;
let lastEvent = null;

const APP_INFO = {
  name: 'Anime Neom Clash',
  version: '1.0.0',
  author: 'Anime Live Battle',
};

const CATEGORY = {
  categoryId: 'anime_neom_clash',
  categoryName: 'Anime Neom Clash',
};

const ACTIONS = [
  { actionId: 'comment_join_small', actionName: 'Comentou !EU • entrar na categoria baixa' },
  { actionId: 'likes_heal_50', actionName: '50 curtidas • curar 10 HP' },
  { actionId: 'rose_join_medium', actionName: 'Rosa • entrar na categoria média' },
  { actionId: 'mini_dino_join_large', actionName: 'Mini Dino • entrar na categoria grande' },
  { actionId: 'arena_explosion_200', actionName: 'Presente de 200 moedas • explodir arena' },
];

const MIME_TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.m4a': 'audio/mp4',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.ogg': 'audio/ogg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.webm': 'video/webm',
  '.webp': 'image/webp',
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Private-Network': 'true',
  'Cache-Control': 'no-store',
};

function sendJson(res, status, body) {
  res.writeHead(status, { ...CORS, 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) req.destroy();
    });
    req.on('end', () => {
      try { resolve(JSON.parse(raw || '{}')); } catch { resolve({}); }
    });
  });
}

function configFromAction(actionId) {
  if (actionId === 'comment_join_small') return { kind: 'entry', tier: 'small', trigger: 'comment' };
  if (actionId === 'likes_heal_50') return { kind: 'heal', tier: 'small', trigger: 'likes', healAmount: 10 };
  if (actionId === 'rose_join_medium') return { kind: 'entry', tier: 'medium', trigger: 'gift' };
  if (actionId === 'mini_dino_join_large') return { kind: 'entry', tier: 'large', trigger: 'gift' };
  if (actionId === 'arena_explosion_200') return { kind: 'arena-clear', tier: 'large', trigger: 'gift' };
  return null;
}

function cleanName(value, fallback = 'jogador') {
  const clean = String(value || '').trim().replace(/^@+/, '').slice(0, 40);
  return clean || fallback;
}

function createInteraction(actionId, context = {}, source = 'tikfinity') {
  const config = configFromAction(actionId);
  const username = cleanName(context.username || context.uniqueId || context.nickname);
  return {
    id: `${Date.now()}-${++sequence}`,
    type: 'live-interaction',
    actionId,
    kind: config.kind,
    tier: config.tier,
    trigger: config.trigger,
    healAmount: config.healAmount || 0,
    username,
    nickname: cleanName(context.nickname, username),
    avatarUrl: String(context.profilePictureUrl || context.profilePicturUrl || ''),
    giftName: String(context.giftName || context.giftname || ''),
    giftId: context.giftId ?? null,
    coins: Number(context.coins ?? context.diamondCount ?? 0) || 0,
    repeatCount: Math.max(1, Number(context.repeatCount ?? 1) || 1),
    source,
    receivedAt: Date.now(),
  };
}

function broadcast(event) {
  lastEvent = event;
  const frame = `id: ${event.id}\nevent: live-interaction\ndata: ${JSON.stringify(event)}\n\n`;
  for (const client of [...clients]) {
    try { client.write(frame); } catch { clients.delete(client); }
  }
  const label = event.kind === 'heal' ? 'CURA +10' : event.kind === 'arena-clear' ? 'EXPLOSÃO DA ARENA' : { small: 'ENTRADA BAIXA', medium: 'ENTRADA MÉDIA', large: 'ENTRADA GRANDE' }[event.tier];
  console.log(`[${new Date().toLocaleTimeString('pt-BR')}] ${label} • @${event.username} • ${event.giftName || event.trigger}`);
}

function openEventStream(req, res) {
  res.writeHead(200, {
    ...CORS,
    'Content-Type': 'text/event-stream; charset=utf-8',
    Connection: 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.write(`event: bridge\ndata: ${JSON.stringify({ connected: true, lastEvent })}\n\n`);
  clients.add(res);
  const heartbeat = setInterval(() => {
    try { res.write(': ping\n\n'); } catch { clearInterval(heartbeat); }
  }, 15_000);
  req.on('close', () => {
    clearInterval(heartbeat);
    clients.delete(res);
  });
}

function safeFilePath(urlPath) {
  const decoded = decodeURIComponent(urlPath === '/' ? '/index.html' : urlPath);
  const candidate = path.resolve(ROOT, `.${decoded}`);
  return candidate === ROOT || candidate.startsWith(`${ROOT}${path.sep}`) ? candidate : null;
}

function serveFile(req, res, filePath) {
  fs.stat(filePath, (error, stat) => {
    if (error || !stat.isFile()) return sendJson(res, 404, { message: 'Arquivo não encontrado.' });
    const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    const range = req.headers.range;
    if (range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(range);
      const start = match?.[1] ? Number(match[1]) : 0;
      const end = match?.[2] ? Math.min(Number(match[2]), stat.size - 1) : stat.size - 1;
      if (!match || start > end || start >= stat.size) {
        res.writeHead(416, { 'Content-Range': `bytes */${stat.size}` });
        return res.end();
      }
      res.writeHead(206, {
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Range': `bytes ${start}-${end}/${stat.size}`,
        'Content-Type': contentType,
      });
      return fs.createReadStream(filePath, { start, end }).pipe(res);
    }
    res.writeHead(200, {
      'Accept-Ranges': 'bytes',
      'Content-Length': stat.size,
      'Content-Type': contentType,
      'Cache-Control': contentType.startsWith('text/html') ? 'no-store' : 'public, max-age=3600',
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    return res.end();
  }

  if (req.method === 'GET' && url.pathname === '/api/app/info') {
    return sendJson(res, 200, { data: APP_INFO });
  }
  if (req.method === 'GET' && url.pathname === '/api/features/categories') {
    return sendJson(res, 200, { data: [CATEGORY] });
  }
  if (req.method === 'GET' && url.pathname === '/api/features/actions') {
    const actions = url.searchParams.get('categoryId') === CATEGORY.categoryId ? ACTIONS : [];
    return sendJson(res, 200, { data: actions });
  }
  if (req.method === 'POST' && url.pathname === '/api/features/actions/exec') {
    const body = await readJson(req);
    if (!configFromAction(body.actionId)) return sendJson(res, 200, { message: `Ação desconhecida: ${body.actionId || '(vazia)'}` });
    const source = body.context?.source === 'test' || body.context?.eventType === 'test' ? 'test' : 'tikfinity';
    broadcast(createInteraction(body.actionId, body.context, source));
    return sendJson(res, 200, { data: [] });
  }
  if (req.method === 'GET' && url.pathname === '/api/live/events') {
    return openEventStream(req, res);
  }
  if (req.method === 'GET' && url.pathname === '/api/live/status') {
    return sendJson(res, 200, { connected: true, viewers: clients.size, lastEvent });
  }
  if (req.method === 'POST' && url.pathname === '/api/live/test') {
    const body = await readJson(req);
    const actionId = configFromAction(body.actionId) ? body.actionId : 'comment_join_small';
    const action = configFromAction(actionId);
    const context = {
      username: cleanName(body.username, `teste_${sequence + 1}`),
      nickname: body.nickname,
      profilePictureUrl: body.avatarUrl,
      giftName: body.giftName || (actionId === 'rose_join_medium' ? 'Rose' : actionId === 'mini_dino_join_large' ? 'Mini Dino' : actionId === 'arena_explosion_200' ? 'Presente 200' : ''),
      coins: body.coins || (actionId === 'arena_explosion_200' ? 200 : 1),
      likeCount: action.trigger === 'likes' ? 50 : 0,
      comment: action.trigger === 'comment' ? 'eu' : '',
    };
    const event = createInteraction(actionId, context, 'test');
    broadcast(event);
    return sendJson(res, 200, { ok: true, event });
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    const filePath = safeFilePath(url.pathname);
    if (filePath) return serveFile(req, res, filePath);
  }
  sendJson(res, 404, { message: `Rota inexistente: ${url.pathname}` });
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`A porta ${PORT} já está em uso. Feche a outra ponte da LIVE e tente novamente.`);
  } else {
    console.error(error);
  }
  process.exitCode = 1;
});

server.listen(PORT, HOST, () => {
  console.log('');
  console.log('ANIME NEOM CLASH • PONTE DA LIVE');
  console.log(`Arena:     http://${HOST}:${PORT}/?mode=live`);
  console.log(`TikFinity: http://${HOST}:${PORT}`);
  console.log('Aguardando eventos...');
  console.log('');
});
