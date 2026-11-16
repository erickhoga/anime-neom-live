(() => {
  const canvas = document.querySelector('#arena');
  const ctx = canvas.getContext('2d');
  const $ = (selector) => document.querySelector(selector);
  const ui = {
    active: $('#activeCount'), empty: $('#emptyState'), viewer: $('#viewerName'), error: $('#fieldError'),
    roulette: $('#roulette'), rouletteTier: $('#rouletteTier'), rouletteWheel: $('#rouletteWheel'), rouletteLabels: $('#rouletteLabels'), rouletteViewer: $('#rouletteViewer'),
    result: $('#result'), resultLabel: $('#resultLabel'), resultCharacter: $('#resultCharacter'), resultViewer: $('#resultViewer'),
    queueList: $('#queueList'), queueCount: $('#queueCount'), queueEmpty: $('#queueEmpty'),
    rankingList: $('#rankingList'), rankingEmpty: $('#rankingEmpty'),
    pause: $('#pauseButton'), dummyTest: $('#dummyTestButton'), escanorTest: $('#escanorTestButton'), bombermanTest: $('#bombermanTestButton'), hitsugayaTest: $('#hitsugayaTestButton'), killuaTest: $('#killuaTestButton'), isagiTest: $('#isagiTestButton'), midoriyaTest: $('#midoriyaTestButton'), rudeusTest: $('#rudeusTestButton'), ichigoTest: $('#ichigoTestButton'), luffyTest: $('#luffyTestButton'), denjiTest: $('#denjiTestButton'), erenTest: $('#erenTestButton'), narutoTest: $('#narutoTestButton'), pikachuTest: $('#pikachuTestButton'), edwardTest: $('#edwardTestButton'), rimuruTest: $('#rimuruTestButton'), gokuTest: $('#gokuTestButton'), gojoTest: $('#gojoTestButton'), remove: $('#removeButton'), clear: $('#clearButton'), speed: $('#speedSelect')
  };
  const kiritoTestButton=$('#kiritoTestButton');
  const lelouchTestButton=$('#lelouchTestButton');
  const saitamaTestButton=$('#saitamaTestButton');
  const zenitsuTestButton=$('#zenitsuTestButton');
  const meguminTestButton=$('#meguminTestButton');
  const yorTestButton=$('#yorTestButton');
  const thorfinnTestButton=$('#thorfinnTestButton');
  const singedTestButton=$('#singedTestButton');
  const subaruTestButton=$('#subaruTestButton');
  const genosTestButton=$('#genosTestButton');
  const sungTestButton=$('#sungTestButton');
  const tanjiroTestButton=$('#tanjiroTestButton');
  const itadoriTestButton=$('#itadoriTestButton');
  const shikamaruTestButton=$('#shikamaruTestButton');
  const namiTestButton=$('#namiTestButton');
  const minatoTestButton=$('#minatoTestButton');
  const cainTestButton=$('#cainTestButton');
  const metalBatTestButton=$('#metalBatTestButton');
  const modeButtons=[...document.querySelectorAll('.mode-switch__button[data-mode]')];
  const modeEyebrow=$('#modeEyebrow'),queueSubtitle=$('#queueSubtitle'),queueTitle=$('#queueTitle'),rankingSubtitle=$('#rankingSubtitle'),rankingTitle=$('#rankingTitle');
  const videoGenerateButton=$('#videoGenerateButton'),videoRecordButton=$('#videoRecordButton'),videoPauseButton=$('#videoPauseButton'),videoBattleStatus=$('#videoBattleStatus');
  const videoCountdown=$('#videoCountdown'),videoCountdownLabel=$('#videoCountdownLabel'),videoCountdownValue=$('#videoCountdownValue');
  const videoForcedReveal=$('#videoForcedReveal'),videoForcedPortrait=$('#videoForcedPortrait'),videoForcedCharacter=$('#videoForcedCharacter'),videoForcedPlayer=$('#videoForcedPlayer');
  const videoEntryReveal=$('#videoEntryReveal'),videoEntryPortrait=$('#videoEntryPortrait'),videoEntryCharacter=$('#videoEntryCharacter'),videoEntryPlayer=$('#videoEntryPlayer');let videoEntryPlayerAvatar=$('#videoEntryPlayerAvatar');
  const videoDuel=$('#videoDuel'),videoDuelAvatarA=$('#videoDuelAvatarA'),videoDuelAvatarB=$('#videoDuelAvatarB'),videoDuelNameA=$('#videoDuelNameA'),videoDuelNameB=$('#videoDuelNameB');
  const videoKo=$('#videoKo'),videoKoBall=$('#videoKoBall'),videoKoName=$('#videoKoName');
  const videoFinal=$('#videoFinal'),videoChampionName=$('#videoChampionName'),videoSurvivalPodium=$('#videoSurvivalPodium'),videoConfetti=$('#videoConfetti');
  const videoPlayerNameInputs=[...document.querySelectorAll('.video-player-name')];
  const videoPlayerCharacterSelects=[...document.querySelectorAll('.video-player-character')];
  const videoPlayerImpactToggles=[...document.querySelectorAll('.video-player-impact-toggle')];
  const videoPlayerSlots=[...document.querySelectorAll('[data-player-slot]')];
  const videoParticipantList=$('#videoParticipantList'),videoSlotsClear=$('#videoSlotsClear'),videoParticipantsReset=$('#videoParticipantsReset'),videoParticipantFeedback=$('#videoParticipantFeedback');
  const videoParticipantsCaption=$('#videoParticipantsCaption'),videoCaptionCopy=$('#videoCaptionCopy');
  const videoCharacterPicker=$('#videoCharacterPicker'),videoCharacterPickerTitle=$('#videoCharacterPickerTitle'),videoCharacterPickerGrid=$('#videoCharacterPickerGrid'),videoCharacterPickerClose=$('#videoCharacterPickerClose');
  let videoCharacterPickerIndex=-1,videoCharacterPickerButtons=[];
  const appShell=$('.app-shell');
  const charactersInfoButton=$('#charactersInfoButton'),charactersModal=$('#charactersModal'),charactersModalClose=$('#charactersModalClose'),charactersGallery=$('#charactersGallery');
  const characterAudioName=$('#characterAudioName'),characterAudioStatus=$('#characterAudioStatus'),characterAudioReplay=$('#characterAudioReplay'),characterAudioVolume=$('#characterAudioVolume'),characterPreviewAudio=$('#characterPreviewAudio');
  const musicToggle=$('#musicToggle'),musicSelect=$('#musicSelect');
  const liveRoulette=$('#liveRoulette'),liveRouletteTrack=$('#liveRouletteTrack'),liveRouletteName=$('#liveRouletteName'),liveRouletteViewer=$('#liveRouletteViewer');
  const liveArenaExplosion=$('#liveArenaExplosion'),liveArenaExplosionUser=$('#liveArenaExplosionUser');
  const botSpawnCountdown=$('#botSpawnCountdown'),botSpawnCountdownValue=$('#botSpawnCountdownValue');
  const liveRankingList=$('#liveRankingList');
  const liveQueueSimulation=$('#liveQueueSimulation');
  const liveBridgeMonitor=$('#liveBridgeMonitor'),liveBridgeDot=$('#liveBridgeDot'),liveBridgeStatus=$('#liveBridgeStatus'),liveBridgeEvent=$('#liveBridgeEvent');
  const liveBridgeTestButtons=[...document.querySelectorAll('[data-live-test-action]')];
  let liveQueueSimulationTimer=0,liveQueueSimulationIndex=0,liveQueueSimulationRunning=false;
  let activeLiveDonation=null,liveBridgeSource=null,liveBridgeRetryTimer=0;
  const pendingLiveDonations=[],seenLiveDonationIds=new Set();
  const LIVE_LIKE_HEAL_COOLDOWN_MS=20_000,liveLikeHealReadyAt=new Map();
  const LIVE_BOT_IDLE_MS=10_000;
  let liveNoHumanSince=0,liveNextBotAt=0,liveBotSpawnFlashUntil=0;
  let liveEntryPresentationTimer=0,liveEntryPresentationRun=0,liveEntryInProgress=false,liveEntryCurrent=null,pausedLiveCharacterAudio=[];

  const tierConfig = {
    small:  { label:'ROLETA — DOAÇÃO PEQUENA', shortLabel:'PEQUENA', start:1,  end:10, color:'#34f4ff', heal:15, maxHp:60, damageMultiplier:.65 },
    medium: { label:'ROLETA — DOAÇÃO MÉDIA',   shortLabel:'MÉDIA',   start:11, end:20, color:'#9b69ff', heal:35, maxHp:80, damageMultiplier:.8 },
    large:  { label:'ROLETA — DOAÇÃO GRANDE',  shortLabel:'GRANDE',  start:21, end:30, color:'#ffd15c', heal:60, maxHp:100, damageMultiplier:1 },
    video:  { label:'MODO VÍDEO', shortLabel:'EQUALIZADO', color:'#34f4ff', heal:0, maxHp:100, damageMultiplier:1 }
  };
  const palette = ['#34f4ff','#ff4d8d','#9b69ff','#ffd15c','#66ffa8','#ff7a45','#6ea8ff','#f36cff','#b8ff5c','#ff5f5f'];
  palette.NaN='#ffd84d';
  const ichigoImage=new Image();ichigoImage.src='./assets/ichigo.png';
  const getsugaImage=new Image();getsugaImage.src='./assets/getsuga.png?v=20261027-01';
  const luffyImage=new Image();luffyImage.src='./assets/luffy-full.png?v=20261025-25';
  const luffyFistImage=new Image();luffyFistImage.src='./assets/soco.png';
  const denjiImage=new Image();denjiImage.src='./assets/denji-full.png?v=20261025-24';
  const erenImages=[1,2,3].map(form=>{const image=new Image();image.src=form===1?'./assets/eren-full.png':`./assets/eren${form}.png`;return image});
  const narutoImage=new Image();narutoImage.src='./assets/naruto-full.png';
  const rasenganImage=new Image();rasenganImage.src='./assets/rasengan.png';
  const pikachuImage=new Image();pikachuImage.src='./assets/pikachu-full.png';
  const edwardImage=new Image();edwardImage.src='./assets/edward-full.png';
  const alImage=new Image();alImage.src='./assets/al.png';
  const rimuruImage=new Image();rimuruImage.src='./assets/rimuru-full.png';
  const gokuImage=new Image();gokuImage.src='./assets/goku-full.png';
  const gojoImage=new Image();gojoImage.src='./assets/gojo-full.png';
  const escanorImage=new Image();escanorImage.src='./assets/escanor-full.png';
  const sunImage=new Image();sunImage.src='./assets/sol.png';
  const bombermanImage=new Image();bombermanImage.src='./assets/bomberman-full.png';
  const bombImage=new Image();bombImage.src='./assets/bomb.png';
  const hitsugayaImage=new Image();hitsugayaImage.src='./assets/hitsugaya.png';
  const killuaImage=new Image();killuaImage.src='./assets/killua.png';
  const isagiImage=new Image();isagiImage.src='./assets/isagi.png';
  const soccerBallImage=new Image();soccerBallImage.src='./assets/ball.png';
  const midoriyaImage=new Image();midoriyaImage.src='./assets/midoriya.png';
  const rudeusImage=new Image();rudeusImage.src='./assets/rudeus.png';
  const kiritoImage=new Image();kiritoImage.src='./assets/kirito.png';
  const kiritoSwordsImage=new Image();kiritoSwordsImage.src='./assets/kirito-swords.png';
  const lelouchImage=new Image();lelouchImage.src='./assets/lelouch.png';
  const saitamaImage=new Image();saitamaImage.src='./assets/saitama.png';
  const saitamaPunchImage=new Image();saitamaPunchImage.src='./assets/punch.png';
  const zenitsuImage=new Image();zenitsuImage.src='./assets/zenitsu.png';
  const meguminImage=new Image();meguminImage.src='./assets/megumin.png';
  const yorImage=new Image();yorImage.src='./assets/yor.png';
  const thorfinnImage=new Image();thorfinnImage.src='./assets/thorfin.png';
  const singedImage=new Image();singedImage.src='./assets/singed.png';
  const subaruImage=new Image();subaruImage.src='./assets/subaru-full.png';
  const genosImage=new Image();genosImage.src='./assets/genos.png';
  const sungImage=new Image();sungImage.src='./assets/sung.png';
  const tanjiroImage=new Image();tanjiroImage.src='./assets/tanjiro.png';
  const itadoriImage=new Image();itadoriImage.src='./assets/itadori.png';
  const shikamaruImage=new Image();shikamaruImage.src='./assets/shikamaru.png';
  const namiImage=new Image();namiImage.src='./assets/nami.png';
  const minatoImage=new Image();minatoImage.src='./assets/minato.png';
  const cainImage=new Image();cainImage.src='./assets/cain.png';
  const metalBatImage=new Image();metalBatImage.src='./assets/metalbat.png';
  const yorKnifeImage=new Image(),yorKnifeAsset=document.createElement('canvas');
  yorKnifeImage.addEventListener('load',()=>{yorKnifeAsset.width=yorKnifeImage.naturalWidth;yorKnifeAsset.height=yorKnifeImage.naturalHeight;const knifeCtx=yorKnifeAsset.getContext('2d',{willReadFrequently:true});knifeCtx.drawImage(yorKnifeImage,0,0);const pixels=knifeCtx.getImageData(0,0,yorKnifeAsset.width,yorKnifeAsset.height);for(let i=0;i<pixels.data.length;i+=4){const distanceFromWhite=255-Math.min(pixels.data[i],pixels.data[i+1],pixels.data[i+2]);pixels.data[i+3]=Math.round(pixels.data[i+3]*Math.max(0,Math.min(1,(distanceFromWhite-5)/30)))}knifeCtx.putImageData(pixels,0,0)});yorKnifeImage.src='./assets/faca.png';
  const chainsawImage=new Image(),chainsawAsset=document.createElement('canvas');
  chainsawImage.addEventListener('load',()=>{chainsawAsset.width=chainsawImage.naturalWidth;chainsawAsset.height=chainsawImage.naturalHeight;const sawCtx=chainsawAsset.getContext('2d',{willReadFrequently:true});sawCtx.drawImage(chainsawImage,0,0);const pixels=sawCtx.getImageData(0,0,chainsawAsset.width,chainsawAsset.height);for(let i=0;i<pixels.data.length;i+=4){const luminance=(pixels.data[i]+pixels.data[i+1]+pixels.data[i+2])/3;pixels.data[i]=178;pixels.data[i+1]=186;pixels.data[i+2]=196;pixels.data[i+3]=Math.round(pixels.data[i+3]*(255-luminance)/255)}sawCtx.putImageData(pixels,0,0)});chainsawImage.src='./assets/serra.png';
  const MAX_BALLS=6;
  const MAX_NARUTO_CLONES=3;
  const MAX_SUNG_SHADOWS=2;
  const ALL_CHARACTERS=Array.from({length:35},(_,index)=>`char${index+1}`);
  const TIER_CHARACTER_POOLS={small:['char1','char2','char3','char4','char5','char6','char7','char8','char9','char10','char31','char32','char35'],medium:Array.from({length:10},(_,index)=>`char${index+11}`),large:[...Array.from({length:10},(_,index)=>`char${index+21}`),'char33','char34']};
  const VIDEO_ARENA_SHRINK_DELAY=18,VIDEO_ARENA_SHRINK_DURATION=42;
  const VIDEO_DRAFT_SPIN_DURATIONS=[3500,3100,2750,2450,2200,2000];
  const SUBARU_RETURN_COOLDOWN=47,SUBARU_RETURN_HP=.38,SUBARU_SHADOW_HEAL_LIMIT=.54,SUBARU_SHADOW_HEAL_TARGET=.51;
  const VIDEO_CHARACTER_BALANCE={
    char1:{abilityDamage:2.6},char6:{returnCooldown:49,returnHp:.375,shadowHealLimit:.53,shadowHealTarget:.5},char12:{abilityDamage:1.8,cooldown:.75},
    char13:{abilityDamage:1.75},char16:{abilityDamage:1.8},char20:{abilityDamage:3.2,cooldown:.82},char23:{abilityDamage:.98,damageTaken:.97},char28:{abilityDamage:.95,cooldown:1.01},
    char31:{abilityDamage:1.2},char32:{abilityDamage:1.15},char33:{abilityDamage:1.27},char34:{abilityDamage:1.15},char35:{abilityDamage:1.41}
  };
  const LIVE_CHARACTER_BALANCE=globalThis.__arenaDisableLiveBalance?{}:{
    char23:{outgoingDamage:.72},char25:{outgoingDamage:.55},char28:{outgoingDamage:.78},char29:{outgoingDamage:.82}
  };
  function videoCharacterBalance(ball){return ball?.tier==='video'?VIDEO_CHARACTER_BALANCE[ball.character]||null:null}
  function liveCharacterBalance(ball){return state.viewMode==='live'?LIVE_CHARACTER_BALANCE[ball?.character]||null:null}
  function videoAbilityDamage(owner,damage){return damage*(videoCharacterBalance(owner)?.abilityDamage??1)}
  function videoCharacterCooldown(ball,duration){return duration*(videoCharacterBalance(ball)?.cooldown??1)}
  const POWER_BALANCE=globalThis.__arenaDisablePowerBalance?{}:{
    char7:{first:6.5,cooldown:6.5,baseCooldown:7},char8:{first:7.3,cooldown:7.3,baseCooldown:7},char9:{first:7.7,cooldown:7.7,baseCooldown:7},
    char17:{first:9.4,cooldown:9.4,baseCooldown:9.4},char20:{first:8.8,cooldown:8.8,baseCooldown:8},char24:{first:9.2},char16:{first:9.6},
    char19:{first:10.3,cooldown:10.3,baseCooldown:10},char21:{first:10.6,cooldown:10.6,baseCooldown:10},char22:{first:10.9,cooldown:10.9,baseCooldown:10},
    char26:{first:11.2,cooldown:11.2,baseCooldown:10},char29:{first:11.5,cooldown:11.5,baseCooldown:11},char14:{first:12.4,cooldown:12.4,baseCooldown:12},
    char28:{first:12.8,cooldown:12.8,baseCooldown:12},char30:{first:5.5,cooldown:5.5,baseCooldown:5}
  };
  function balancedCooldown(character,fallback){return POWER_BALANCE[character]?.cooldown??fallback}
  function balancedDamage(character,baseDamage){const balance=POWER_BALANCE[character];return balance?.baseCooldown?baseDamage*balance.cooldown/balance.baseCooldown:baseDamage}
  function balancedDuration(character,baseDuration){const balance=POWER_BALANCE[character];return balance?.baseCooldown?baseDuration*balance.cooldown/balance.baseCooldown:baseDuration}
  const state = { width:700,height:700,running:true,speed:1,lastTime:performance.now(),time:0,balls:[],companions:[],queue:[],projectiles:[],particles:[],floaters:[],profiles:new Map(),contactCooldowns:new Map(),spinning:false,nextId:1,wheelRotation:Math.random()*360,subaruRewindUntil:0,sungAriseUntil:0,viewMode:'dev',videoIntroActive:false,videoDraftId:0,videoBattleStarted:false,videoBattleStartedAt:0,videoFinalPending:false,videoFinalShown:false,videoFinalDuelShown:false,videoFinalDuelPending:false,videoFinalKoShown:false,videoEliminationOrder:[],videoPlayerNames:[],videoPlayerAvatars:[],videoPlayerCharacters:[],videoPlayerImpacts:[] };
  let automaticRecording=null;

  function playerBallCount() { return state.balls.filter(ball=>!ball.isClone).length; }
  function sameCloneFamily(a,b) { return a.cloneFamilyId&&a.cloneFamilyId===b.cloneFamilyId; }
  function characterTier(character) { if(character==='dummy')return'video';if(character==='char31'||character==='char32'||character==='char35')return'small';const number=Number(character.slice(4));return number<=10?'small':number<=20?'medium':'large'; }

  function arenaBounds() {
    if(state.viewMode!=='video'||!state.videoBattleStarted)return{left:0,top:0,right:state.width,bottom:state.height,progress:0};
    const raw=Math.max(0,Math.min(1,(state.time-state.videoBattleStartedAt-VIDEO_ARENA_SHRINK_DELAY)/VIDEO_ARENA_SHRINK_DURATION)),progress=raw*raw*(3-2*raw),insetX=state.width*.18*progress,insetY=state.height*.18*progress;
    return{left:insetX,top:insetY,right:state.width-insetX,bottom:state.height-insetY,progress};
  }

  function fitCanvas() {
    const rect=canvas.getBoundingClientRect(),deviceRatio=window.devicePixelRatio||1,ratio=document.body.classList.contains('video-recording')?Math.min(Math.max(deviceRatio,2.5),3):Math.min(deviceRatio,2);
    canvas.width=Math.round(rect.width*ratio); canvas.height=Math.round(rect.height*ratio);
    state.width=rect.width; state.height=rect.height; ctx.setTransform(ratio,0,0,ratio,0,0);
  }

  function refitArenaToLayout() {
    const oldWidth=state.width||700,oldHeight=state.height||700;fitCanvas();const scaleX=state.width/oldWidth,scaleY=state.height/oldHeight;for(const ball of state.balls){ball.x*=scaleX;ball.y*=scaleY;ball.baseMoveSpeed=state.width*.18;ball.moveSpeed=ball.character==='char24'?(ball.erenForm===2?ball.baseMoveSpeed*2:ball.erenForm===3?ball.baseMoveSpeed*.58:ball.baseMoveSpeed):ball.baseMoveSpeed;keepConstantSpeed(ball);ball.x=Math.min(state.width-ball.radius,Math.max(ball.radius,ball.x));ball.y=Math.min(state.height-ball.radius,Math.max(ball.radius,ball.y))}for(const companion of state.companions){companion.x*=scaleX;companion.y*=scaleY;companion.baseMoveSpeed=state.width*(companion.type==='soccerBall'?.18:companion.type==='sungShadow'?.24:.14);companion.moveSpeed=companion.baseMoveSpeed;const speed=Math.hypot(companion.vx,companion.vy)||1;companion.vx=companion.vx/speed*companion.moveSpeed;companion.vy=companion.vy/speed*companion.moveSpeed}
  }

  function clearArenaSession() {
    stopAllCharacterAudio();
    cancelLiveEntryPresentation(false);stopEntryVoice();stopRouletteSound();state.videoDraftId+=1;state.videoIntroActive=false;state.videoBattleStarted=false;state.videoBattleStartedAt=0;state.videoFinalPending=false;state.videoFinalShown=false;state.videoFinalDuelShown=false;state.videoFinalDuelPending=false;state.videoFinalKoShown=false;state.videoEliminationOrder=[];state.time=0;state.balls=[];state.companions=[];state.queue=[];state.projectiles=[];state.particles=[];state.floaters=[];state.profiles.clear();state.contactCooldowns.clear();state.nextId=1;state.subaruRewindUntil=0;state.sungAriseUntil=0;state.spinning=false;liveNoHumanSince=0;liveNextBotAt=0;liveBotSpawnFlashUntil=0;botSpawnCountdown.hidden=true;ui.roulette.hidden=true;ui.roulette.classList.remove('is-forced-impact');videoForcedReveal.hidden=true;ui.result.hidden=true;videoCountdown.hidden=true;videoCountdown.classList.remove('is-draw-title','is-battle');videoDuel.hidden=true;videoKo.hidden=true;videoFinal.hidden=true;videoConfetti.innerHTML='';ui.rouletteWheel.classList.remove('roulette-wheel--video-draft','roulette-wheel--upgrade');videoGenerateButton.disabled=false;videoPauseButton.disabled=false;if(musicEnabled&&musicStarted&&backgroundMusic.paused){backgroundMusic.currentTime=0;startBackgroundMusic()}syncUi();
  }

  function setViewMode(mode) {
    if(!['dev','video','live'].includes(mode))return;if(mode!=='video'&&automaticRecording)stopAutomaticRecording();if(mode!=='video'){document.body.classList.remove('video-focus');videoDuel.hidden=true;videoKo.hidden=true;videoFinal.hidden=true;if(state.videoIntroActive){state.videoDraftId+=1;state.videoIntroActive=false;ui.roulette.hidden=true;videoCountdown.hidden=true;videoGenerateButton.disabled=false;videoPauseButton.disabled=false}}state.viewMode=mode;document.body.classList.toggle('mode-dev',mode==='dev');document.body.classList.toggle('mode-video',mode==='video');document.body.classList.toggle('mode-live',mode==='live');for(const button of modeButtons)button.classList.toggle('is-active',button.dataset.mode===mode);const video=mode==='video',live=mode==='live';modeEyebrow.textContent=video?'MODO VÍDEO • FRAME 9:16':live?'TIKTOK LIVE • ARENA AO VIVO':'SIMULADOR DE LIVE';queueSubtitle.textContent=video?'SEIS LUTADORES':live?'AGUARDANDO ENTRADA':'AGUARDANDO VAGA';queueTitle.textContent=video?'PARTICIPANTES':live?'PRÓXIMOS JOGADORES':'FILA DE ENTRADA';rankingSubtitle.textContent=video?'PLACAR DA BATALHA':live?'RANKING VISÍVEL':'MAIORES PONTUAÇÕES';rankingTitle.textContent=video?'RANKING DO VÍDEO':live?'TOP 3 DA LIVE':'TOP 10 DA LIVE';requestAnimationFrame(()=>{refitArenaToLayout();syncUi()});
  }

  function enterVideoFocus() {
    document.body.classList.add('video-focus');
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      appShell.scrollIntoView({behavior:'smooth',block:'start'});
      refitArenaToLayout();
    }));
  }

  function recordingMimeType() {
    if(!window.MediaRecorder?.isTypeSupported)return'';
    return['video/webm;codecs=vp9,opus','video/webm;codecs=vp8,opus','video/webm','video/mp4'].find(type=>MediaRecorder.isTypeSupported(type))||'';
  }

  function nativeScreenRecorder() {
    const capacitor=window.Capacitor;
    if(!capacitor||!capacitor.isNativePlatform?.())return null;
    return capacitor.Plugins?.NativeScreenRecorder||null;
  }

  function resetRecordingUi() {
    automaticRecording=null;document.body.classList.remove('video-recording');videoRecordButton.disabled=false;videoRecordButton.classList.remove('is-recording');videoRecordButton.textContent='● GRAVAR VÍDEO';requestAnimationFrame(refitArenaToLayout);
  }

  function activateNativeRecording(plugin,withAudio=true) {
    if(automaticRecording?.native)return automaticRecording;
    const session={native:true,plugin,stopping:false,finalTimer:0};automaticRecording=session;videoRecordButton.disabled=false;videoRecordButton.classList.add('is-recording');videoRecordButton.textContent='■ PARAR GRAVAÇÃO';videoBattleStatus.textContent=withAudio?'Gravando MP4 • áudio interno do jogo...':'Gravando MP4 • sem áudio (permissão não autorizada)...';
    setTimeout(()=>{if(automaticRecording!==session||session.stopping||state.videoIntroActive||state.running)return;startBackgroundMusic();generateVideoBattle()},700);return session;
  }

  window.addEventListener('native-recorder-ready',async()=>{
    const plugin=nativeScreenRecorder();if(!plugin||automaticRecording?.native)return;
    try{const status=await plugin.status();if(status?.recording)activateNativeRecording(plugin,true)}catch(error){}
  });

  function paintRecordingFrame(session) {
    if(automaticRecording!==session||session.stopping)return;
    const rect=appShell.getBoundingClientRect(),sourceWidth=session.video.videoWidth,sourceHeight=session.video.videoHeight,viewportWidth=Math.max(1,window.innerWidth),viewportHeight=Math.max(1,window.innerHeight),scaleX=sourceWidth/viewportWidth,scaleY=sourceHeight/viewportHeight;
    const sx=Math.max(0,rect.left*scaleX),sy=Math.max(0,rect.top*scaleY),sw=Math.min(sourceWidth-sx,rect.width*scaleX),sh=Math.min(sourceHeight-sy,rect.height*scaleY);
    session.context.fillStyle='#03040c';session.context.fillRect(0,0,1080,1920);if(sw>0&&sh>0)session.context.drawImage(session.video,sx,sy,sw,sh,0,0,1080,1920);
    if(ui.roulette.hidden&&videoCountdown.hidden&&videoFinal.hidden&&ui.result.hidden){const arenaRect=canvas.getBoundingClientRect(),dx=(arenaRect.left-rect.left)/rect.width*1080,dy=(arenaRect.top-rect.top)/rect.height*1920,dw=arenaRect.width/rect.width*1080,dh=arenaRect.height/rect.height*1920;if(dw>0&&dh>0)session.context.drawImage(canvas,0,0,canvas.width,canvas.height,dx,dy,dw,dh)}
    session.frame=requestAnimationFrame(()=>paintRecordingFrame(session));
  }

  function finalizeAutomaticRecording(session) {
    if(session.finalized)return;session.finalized=true;cancelAnimationFrame(session.frame);clearTimeout(session.finalTimer);session.displayStream.getTracks().forEach(track=>track.stop());session.outputStream.getTracks().forEach(track=>track.stop());session.video.pause();session.video.srcObject=null;
    const shouldDownload=session.chunks.length>0,blob=shouldDownload?new Blob(session.chunks,{type:session.recorder.mimeType||'video/webm'}):null,extension=(session.recorder.mimeType||'').includes('mp4')?'mp4':'webm';
    resetRecordingUi();
    if(blob){const url=URL.createObjectURL(blob),link=document.createElement('a'),timestamp=new Date().toISOString().replace(/[:.]/g,'-');link.href=url;link.download=`anime-neom-clash-${timestamp}.${extension}`;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);videoBattleStatus.textContent=`Vídeo salvo • ${Math.max(1,Math.round(blob.size/1024/1024))} MB • ${extension.toUpperCase()}`}else videoBattleStatus.textContent='A gravação terminou sem gerar um arquivo.';
  }

  async function stopAutomaticRecording() {
    const session=automaticRecording;if(!session||session.stopping)return;session.stopping=true;clearTimeout(session.finalTimer);videoRecordButton.disabled=true;videoRecordButton.textContent='SALVANDO...';
    if(session.native){
      try{await session.plugin.stop();resetRecordingUi();videoBattleStatus.textContent='Vídeo MP4 salvo na galeria • Movies/Anime Neom Clash'}catch(error){resetRecordingUi();videoBattleStatus.textContent=error?.message||'Não foi possível finalizar a gravação nativa.'}
      return;
    }
    if(session.recorder.state!=='inactive')session.recorder.stop();else finalizeAutomaticRecording(session);
  }

  function scheduleAutomaticRecordingFinish() {
    const session=automaticRecording;if(!session||session.stopping)return;videoRecordButton.textContent='FINALIZANDO...';session.finalTimer=setTimeout(stopAutomaticRecording,5000);
  }

  async function startAutomaticRecording() {
    if(automaticRecording){stopAutomaticRecording();return}
    if(state.viewMode!=='video'){videoBattleStatus.textContent='Abra o modo VÍDEO 9:16 antes de gravar.';return}
    const nativeRecorder=nativeScreenRecorder();
    if(nativeRecorder){
      videoRecordButton.disabled=true;videoRecordButton.textContent='AUTORIZE A GRAVAÇÃO...';videoBattleStatus.textContent='Autorize a tela inteira • o áudio será somente o interno.';document.body.classList.add('video-recording');enterVideoFocus();
      try{
        const result=await nativeRecorder.start();activateNativeRecording(nativeRecorder,result?.withAudio!==false);
      }catch(error){resetRecordingUi();videoBattleStatus.textContent=error?.message||'Não foi possível iniciar a gravação nativa.'}
      return;
    }
    if(!navigator.mediaDevices?.getDisplayMedia||!window.MediaRecorder||!HTMLCanvasElement.prototype.captureStream){videoBattleStatus.textContent='Este navegador não oferece gravação automática. Use Chrome ou Edge atualizado.';return}
    videoRecordButton.disabled=true;videoRecordButton.textContent='ESCOLHA ESTA ABA...';videoBattleStatus.textContent='Na janela do navegador, escolha esta aba e mantenha “Compartilhar áudio” marcado.';document.body.classList.add('video-recording');enterVideoFocus();
    let displayStream;
    try{
      displayStream=await navigator.mediaDevices.getDisplayMedia({video:{width:{ideal:3840},height:{ideal:2160},frameRate:{ideal:60,max:60}},audio:true,preferCurrentTab:true,selfBrowserSurface:'include',surfaceSwitching:'exclude',systemAudio:'exclude'});
      const video=document.createElement('video');video.muted=true;video.playsInline=true;video.srcObject=displayStream;await video.play();
      const recordingCanvas=document.createElement('canvas');recordingCanvas.width=1080;recordingCanvas.height=1920;const context=recordingCanvas.getContext('2d',{alpha:false});context.imageSmoothingEnabled=true;context.imageSmoothingQuality='high';const outputStream=recordingCanvas.captureStream(60),audioTrack=displayStream.getAudioTracks()[0];if(audioTrack)outputStream.addTrack(audioTrack.clone());
      const mimeType=recordingMimeType(),options={videoBitsPerSecond:16000000,audioBitsPerSecond:192000};if(mimeType)options.mimeType=mimeType;const recorder=new MediaRecorder(outputStream,options),session={displayStream,outputStream,video,recordingCanvas,context,recorder,chunks:[],frame:0,finalTimer:0,stopping:false,finalized:false};automaticRecording=session;
      recorder.addEventListener('dataavailable',event=>{if(event.data?.size)session.chunks.push(event.data)});recorder.addEventListener('stop',()=>finalizeAutomaticRecording(session),{once:true});displayStream.getVideoTracks()[0]?.addEventListener('ended',()=>{if(automaticRecording===session&&!session.stopping)stopAutomaticRecording()},{once:true});recorder.start(1000);paintRecordingFrame(session);
      videoRecordButton.disabled=false;videoRecordButton.classList.add('is-recording');videoRecordButton.textContent=audioTrack?'■ PARAR GRAVAÇÃO':'■ PARAR • SEM ÁUDIO';videoBattleStatus.textContent=audioTrack?'Gravando em 1080 × 1920 • qualidade alta...':'Gravando em 1080 × 1920 • compartilhe o áudio na próxima tentativa.';startBackgroundMusic();generateVideoBattle();
    }catch(error){if(displayStream)displayStream.getTracks().forEach(track=>track.stop());document.body.classList.remove('video-recording','video-focus');videoRecordButton.disabled=false;videoRecordButton.classList.remove('is-recording');videoRecordButton.textContent='● GRAVAR VÍDEO';videoBattleStatus.textContent=error?.name==='NotAllowedError'?'Gravação cancelada. Clique novamente quando quiser tentar.':'Não foi possível iniciar a gravação neste navegador.';requestAnimationFrame(refitArenaToLayout)}
  }

  function generateVideoBattle() {
    const usedNames=new Set(),playerNames=videoPlayerNameInputs.map(input=>{const username=parseTikTokUsername(input.value),base=username||sanitizeName(input.value);if(!base)return'';let unique=base,suffix=2;while(usedNames.has(unique.toLowerCase()))unique=`${base.slice(0,20)}_${suffix++}`;usedNames.add(unique.toLowerCase());return unique}),playerAvatars=videoPlayerSlots.map(slot=>slot.dataset.avatarUrl||''),playerCharacters=selectedVideoCharacters(),playerImpacts=videoPlayerImpactToggles.map(toggle=>toggle.checked);clearArenaSession();state.videoPlayerNames=playerNames;state.videoPlayerAvatars=playerAvatars;state.videoPlayerCharacters=playerCharacters;state.videoPlayerImpacts=playerImpacts;const draftId=state.videoDraftId;state.running=false;state.videoIntroActive=true;ui.pause.textContent='Ⅱ PAUSAR';videoPauseButton.textContent='AGUARDE';videoPauseButton.disabled=true;videoGenerateButton.disabled=true;videoGenerateButton.textContent='SORTEANDO...';videoBattleStatus.textContent='Preparando o sorteador com os 35 personagens...';enterVideoFocus();videoCountdown.hidden=false;videoCountdown.classList.remove('is-battle');videoCountdown.classList.add('is-draw-title');videoCountdownLabel.textContent='PREPARE-SE';videoCountdownValue.textContent='SORTEIO';setTimeout(()=>spinVideoDraftRound(draftId,[]),2000);
  }

  function selectedVideoCharacters(){const used=new Set();return videoPlayerCharacterSelects.map(select=>{const character=ALL_CHARACTERS.includes(select.value)?select.value:'';if(!character||used.has(character))return'';used.add(character);return character})}
  function syncVideoCharacterOptions(){const selected=videoPlayerCharacterSelects.map(select=>select.value).filter(Boolean);videoPlayerCharacterSelects.forEach((select,index)=>{for(const option of select.options)option.disabled=Boolean(option.value&&option.value!==select.value&&selected.includes(option.value));const pickerButton=videoCharacterPickerButtons[index];if(pickerButton){const character=select.value,portrait=character?roulettePortrait(character):null;pickerButton.classList.toggle('has-character',Boolean(character));pickerButton.innerHTML=character?`<span class="video-character-picker-button__portrait" style="background-image:url('${portrait.url}');background-position:${portrait.position};background-size:${portrait.size}"></span><b>${characterDisplayName(character)}</b><i>ALTERAR</i>`:`<span class="video-character-picker-button__random">✦</span><b>ALEATÓRIO</b><i>ESCOLHER</i>`;pickerButton.setAttribute('aria-label',character?`Personagem selecionado: ${characterDisplayName(character)}. Alterar escolha`:'Escolher personagem; atualmente aleatório')}const toggle=videoPlayerImpactToggles[index];if(toggle){toggle.disabled=!select.value;if(!select.value)toggle.checked=false}});if(videoCharacterPicker.open&&videoCharacterPickerIndex>=0)renderVideoCharacterPicker()}

  function renderVideoCharacterPicker(){const current=videoPlayerCharacterSelects[videoCharacterPickerIndex]?.value||'',used=new Set(videoPlayerCharacterSelects.map((select,index)=>index===videoCharacterPickerIndex?'':select.value).filter(Boolean));videoCharacterPickerGrid.innerHTML=`<button class="video-character-choice video-character-choice--random${current?'':' is-selected'}" type="button" data-character=""><span>✦</span><b>ALEATÓRIO</b><small>SORTEIO LIVRE</small></button>`+ALL_CHARACTERS.map((character,index)=>{const portrait=roulettePortrait(character),disabled=used.has(character);return`<button class="video-character-choice${current===character?' is-selected':''}${disabled?' is-unavailable':''}" type="button" data-character="${character}"${disabled?' disabled':''} style="--choice-color:${tierConfig[characterTier(character)].color}"><span style="background-image:url('${portrait.url}');background-position:${portrait.position};background-size:${portrait.size}"></span><b>${characterDisplayName(character)}</b><small>${String(index+1).padStart(2,'0')}</small></button>`}).join('')}
  function openVideoCharacterPicker(index){videoCharacterPickerIndex=index;videoCharacterPickerTitle.textContent=`PERSONAGEM DO JOGADOR ${index+1}`;renderVideoCharacterPicker();videoCharacterPicker.showModal()}
  function closeVideoCharacterPicker(){videoCharacterPicker.close();videoCharacterPickerIndex=-1}

  function parseTikTokUsername(value) {
    let raw=String(value||'').trim();if(!raw)return'';
    if(/(?:^|\.)tiktok\.com\//i.test(raw)&&!/^https?:\/\//i.test(raw))raw=`https://${raw.replace(/^\/+/, '')}`;
    if(/^https?:\/\//i.test(raw)){try{const url=new URL(raw),host=url.hostname.replace(/^www\./,'').toLowerCase();if(host!=='tiktok.com'&&!host.endsWith('.tiktok.com'))return'';const segment=url.pathname.split('/').find(part=>part.startsWith('@'));raw=segment?decodeURIComponent(segment.slice(1)):''}catch{return''}}
    raw=raw.replace(/^@/,'').split(/[/?#]/)[0].trim();return/^[a-zA-Z0-9._]{1,24}$/.test(raw)?raw:'';
  }

  function avatarCacheKey(username){return`anime-neom:tiktok-avatar:${username.toLowerCase()}`}
  function cachedAvatar(username){try{return localStorage.getItem(avatarCacheKey(username))||''}catch{return''}}
  function cacheAvatar(username,dataUrl){try{localStorage.setItem(avatarCacheKey(username),dataUrl)}catch{/* A prévia continua válida nesta sessão. */}}
  const VIDEO_PARTICIPANTS_KEY='anime-neom:video-participants:v1';
  function loadVideoParticipants(){
    try{const stored=JSON.parse(localStorage.getItem(VIDEO_PARTICIPANTS_KEY)||'[]'),cached=[];for(let index=0;index<localStorage.length;index++){const key=localStorage.key(index)||'';if(key.startsWith('anime-neom:tiktok-avatar:'))cached.push(key.slice('anime-neom:tiktok-avatar:'.length))}const seen=new Set();return[...(Array.isArray(stored)?stored:[]),...cached].map(parseTikTokUsername).filter(username=>{const key=username.toLowerCase();if(!username||seen.has(key))return false;seen.add(key);return true}).slice(0,30)}catch{return[]}
  }
  let savedVideoParticipants=loadVideoParticipants();
  function persistVideoParticipants(){try{localStorage.setItem(VIDEO_PARTICIPANTS_KEY,JSON.stringify(savedVideoParticipants))}catch{/* A lista continua disponível nesta sessão. */}}
  function setVideoParticipantFeedback(message=''){if(videoParticipantFeedback)videoParticipantFeedback.textContent=message}
  function rememberVideoParticipant(username,dataUrl=''){
    username=parseTikTokUsername(username);if(!username)return;if(dataUrl)cacheAvatar(username,dataUrl);savedVideoParticipants=[username,...savedVideoParticipants.filter(saved=>saved.toLowerCase()!==username.toLowerCase())].slice(0,30);persistVideoParticipants();renderVideoParticipants();
  }
  function renderVideoParticipants(){
    if(!videoParticipantList)return;videoParticipantList.innerHTML='';
    if(!savedVideoParticipants.length){const empty=document.createElement('span');empty.className='video-participant-empty';empty.textContent='Busque o primeiro avatar para salvar uma pessoa.';videoParticipantList.appendChild(empty);return}
    for(const username of savedVideoParticipants){const button=document.createElement('button'),avatar=cachedAvatar(username);button.type='button';button.className='video-participant-chip';button.dataset.username=username;button.setAttribute('aria-label',`Adicionar @${username} ao primeiro slot livre`);const portrait=avatar?document.createElement('img'):document.createElement('span');if(avatar){portrait.src=avatar;portrait.alt=''}else portrait.textContent=username.charAt(0).toUpperCase();const name=document.createElement('b');name.textContent=`@${username}`;button.append(portrait,name);videoParticipantList.appendChild(button)}
  }
  function currentVideoParticipantNames(){const seen=new Set();return videoPlayerNameInputs.map(input=>parseTikTokUsername(input.value)).filter(username=>{const key=username.toLowerCase();if(!username||seen.has(key))return false;seen.add(key);return true})}
  function updateVideoParticipantsCaption(){if(videoParticipantsCaption)videoParticipantsCaption.value=['Participações:',...currentVideoParticipantNames().map(username=>`@${username}`)].join('\n')}
  async function copyVideoText(text){
    if(navigator.clipboard?.writeText){try{await navigator.clipboard.writeText(text);return true}catch{/* Usa a cópia compatível com WebView abaixo. */}}
    try{const helper=document.createElement('textarea');helper.value=text;helper.style.position='fixed';helper.style.opacity='0';document.body.appendChild(helper);helper.select();const copied=document.execCommand('copy');helper.remove();return copied}catch{return false}
  }
  async function useSavedVideoParticipant(username){
    username=parseTikTokUsername(username);if(!username)return;const existingIndex=videoPlayerNameInputs.findIndex(input=>parseTikTokUsername(input.value).toLowerCase()===username.toLowerCase());
    if(existingIndex>=0){videoPlayerNameInputs[existingIndex].focus();setVideoParticipantFeedback(`@${username} já está no slot ${existingIndex+1}.`);return}
    const slotIndex=videoPlayerNameInputs.findIndex(input=>!input.value.trim());
    if(slotIndex<0){const copied=await copyVideoText(`@${username}`);setVideoParticipantFeedback(copied?`Seis slots ocupados • @${username} copiado.`:'Seis slots ocupados.');return}
    const input=videoPlayerNameInputs[slotIndex],slot=videoPlayerSlots[slotIndex],avatar=cachedAvatar(username);input.value=`@${username}`;if(avatar)setVideoPlayerAvatar(slot,avatar,username,`@${username} salvo`);else clearVideoPlayerAvatar(slot,'Pessoa salva • busque o avatar novamente');updateVideoParticipantsCaption();input.dispatchEvent(new Event('input',{bubbles:true}));setVideoParticipantFeedback(`@${username} adicionado ao slot ${slotIndex+1}.`);input.focus();
  }
  function blobAsDataUrl(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.addEventListener('load',()=>resolve(String(reader.result||'')),{once:true});reader.addEventListener('error',()=>reject(new Error('read-failed')),{once:true});reader.readAsDataURL(blob)})}
  const liveAvatarRequests=new Map();
  function generatedLiveAvatar(username){const palettes=[['#6d4aff','#21d4fd'],['#ff3d81','#ffbe3d'],['#00a878','#72f2b1'],['#3157d5','#9f7aea'],['#e53e3e','#ff9a44']],seed=[...username].reduce((total,char)=>total+char.charCodeAt(0),0),[from,to]=palettes[seed%palettes.length],initial=(username.replace(/^@/,'').charAt(0)||'?').toUpperCase(),svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><circle cx="64" cy="64" r="64" fill="url(#g)"/><circle cx="64" cy="64" r="54" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="3"/><text x="64" y="79" text-anchor="middle" font-family="Arial,sans-serif" font-size="58" font-weight="800" fill="#fff">${initial}</text></svg>`;return`data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`}
  function preloadImageUrl(url){return new Promise((resolve,reject)=>{if(!url){reject(new Error('empty-avatar'));return}const image=new Image();image.decoding='async';image.addEventListener('load',()=>resolve(url),{once:true});image.addEventListener('error',()=>reject(new Error('avatar-load-failed')),{once:true});image.src=url;if(image.complete&&image.naturalWidth)resolve(url)})}
  async function prepareLiveDonationAvatar(username,sourceUrl=''){
    const stored=cachedAvatar(username);if(stored){await preloadImageUrl(stored).catch(()=>{});return stored}
    const unavatarUrl=`https://unavatar.io/tiktok/${encodeURIComponent(username)}`;
    const preferredUrl=sourceUrl||unavatarUrl;
    try{return await preloadImageUrl(preferredUrl)}catch{/* Tenta o endereço público do perfil abaixo. */}
    if(preferredUrl!==unavatarUrl){try{return await preloadImageUrl(unavatarUrl)}catch{/* Mantém a última alternativa abaixo. */}}
    return generatedLiveAvatar(username)
  }
  function requestLiveDonationAvatar(username,sourceUrl=''){const key=`${username.toLowerCase()}|${sourceUrl}`;if(!liveAvatarRequests.has(key))liveAvatarRequests.set(key,prepareLiveDonationAvatar(username,sourceUrl));return liveAvatarRequests.get(key)}
  async function readyLiveDonationAvatar(donation){
    if(!donation||donation.isBot)return'';
    if(!donation.avatarReady)return donation.avatarUrl||'';
    return Promise.race([donation.avatarReady,new Promise(resolve=>setTimeout(()=>resolve(donation.avatarUrl||''),3000))]);
  }
  function setVideoPlayerAvatar(slot,dataUrl,username='',message='Avatar pronto'){
    const image=slot.querySelector('.video-player-avatar img'),button=slot.querySelector('.video-player-avatar'),status=slot.querySelector('.video-player-status');slot.dataset.avatarUrl=dataUrl;slot.dataset.avatarUsername=username.toLowerCase();image.src=dataUrl;image.hidden=false;button.classList.add('has-avatar');slot.classList.remove('is-error');slot.classList.add('is-ready');status.textContent=message;
  }
  function clearVideoPlayerAvatar(slot,message='Avatar opcional'){
    const image=slot.querySelector('.video-player-avatar img'),button=slot.querySelector('.video-player-avatar'),status=slot.querySelector('.video-player-status');delete slot.dataset.avatarUrl;delete slot.dataset.avatarUsername;image.removeAttribute('src');image.hidden=true;button.classList.remove('has-avatar');slot.classList.remove('is-ready','is-error');status.textContent=message;
  }
  async function searchVideoPlayerAvatar(slot){
    const input=slot.querySelector('.video-player-name'),button=slot.querySelector('.video-player-search'),status=slot.querySelector('.video-player-status'),username=parseTikTokUsername(input.value);if(!username){clearVideoPlayerAvatar(slot);slot.classList.add('is-error');status.textContent='Use @usuário ou link do TikTok';return}
    input.value=`@${username}`;button.disabled=true;button.textContent='...';slot.classList.remove('is-error');status.textContent='Buscando no TikTok...';
    try{let dataUrl=cachedAvatar(username);if(!dataUrl){const response=await fetch(`https://unavatar.io/tiktok/${encodeURIComponent(username)}`,{mode:'cors',cache:'force-cache'});if(!response.ok)throw new Error(`avatar-${response.status}`);const blob=await response.blob();if(!blob.type.startsWith('image/')||blob.size>2_500_000)throw new Error('invalid-avatar');dataUrl=await blobAsDataUrl(blob);cacheAvatar(username,dataUrl)}setVideoPlayerAvatar(slot,dataUrl,username,`@${username} confirmado`);rememberVideoParticipant(username,dataUrl);updateVideoParticipantsCaption()}catch{clearVideoPlayerAvatar(slot);slot.classList.add('is-error');status.textContent='Não encontrado • toque na foto para enviar'}finally{button.disabled=false;button.textContent='BUSCAR'}
  }

  function buildVideoDraftStrip(entries,selected,targetIndex) {
    const strip=[];
    for(let cycle=0;cycle<3;cycle++){
      const shuffled=[...entries];for(let index=shuffled.length-1;index>0;index--){const swap=Math.floor(Math.random()*(index+1));[shuffled[index],shuffled[swap]]=[shuffled[swap],shuffled[index]]}
      if(strip.length&&strip[strip.length-1]===shuffled[0])[shuffled[0],shuffled[1]]=[shuffled[1],shuffled[0]];
      strip.push(...shuffled);
    }
    strip[targetIndex]=selected;
    for(const neighborIndex of [targetIndex-1,targetIndex+1]){
      if(strip[neighborIndex]!==selected)continue;const outerIndex=neighborIndex<targetIndex?neighborIndex-1:neighborIndex+1,candidates=entries.filter(character=>character!==selected&&character!==strip[outerIndex]);strip[neighborIndex]=candidates[Math.floor(Math.random()*candidates.length)];
    }
    return strip;
  }

  function spinVideoDraftRound(draftId,picked) {
    if(draftId!==state.videoDraftId||state.viewMode!=='video')return;
    videoCountdown.hidden=true;videoForcedReveal.hidden=true;ui.roulette.classList.remove('is-forced-impact');
    if(picked.length>=6){startVideoCountdown(draftId,picked);return}
    const playerIndex=picked.length,spinDuration=VIDEO_DRAFT_SPIN_DURATIONS[playerIndex]||2000,entries=ALL_CHARACTERS,available=entries.filter(character=>!picked.includes(character)),forcedCharacter=state.videoPlayerCharacters[playerIndex],reservedCharacters=new Set(state.videoPlayerCharacters.slice(playerIndex+1).filter(Boolean)),randomAvailable=available.filter(character=>!reservedCharacters.has(character)),randomPool=randomAvailable.length?randomAvailable:available,selected=forcedCharacter&&available.includes(forcedCharacter)?forcedCharacter:randomPool[Math.floor(Math.random()*randomPool.length)],playerName=state.videoPlayerNames[playerIndex]||characterDisplayName(selected),impactReveal=Boolean(state.videoPlayerImpacts[playerIndex]&&selected===forcedCharacter),entryVoice=prepareEntryVoice(selected),targetIndex=76,stripEntries=buildVideoDraftStrip(entries,selected,targetIndex);
    ui.rouletteWheel.classList.remove('roulette-wheel--upgrade');ui.rouletteWheel.classList.add('roulette-wheel--video-draft');ui.rouletteWheel.style.background='linear-gradient(180deg,#171b38,#090b19)';ui.rouletteWheel.style.transition='none';ui.rouletteWheel.style.transform='none';
    ui.rouletteLabels.innerHTML=stripEntries.map((character,index)=>{const portrait=roulettePortrait(character),classes=`roulette-label roulette-label--draft${picked.includes(character)?' is-picked':''}${index===targetIndex?' is-winner-target':''}`;return`<span class="${classes}" data-character="${character}" title="${characterDisplayName(character)}"><span class="roulette-portrait" style="background-image:linear-gradient(180deg,rgba(3,5,15,.01),rgba(3,5,15,.36)),url('${portrait.url}');background-position:${portrait.position};background-size:${portrait.size}"></span><b>${characterDisplayName(character)}</b><small>CHAR ${character.slice(4)}</small></span>`}).join('');
    ui.rouletteTier.textContent=`SORTEIO ${picked.length+1} / 6`;ui.rouletteTier.style.color='#7af7ff';ui.rouletteViewer.textContent=`${available.length} PERSONAGENS DISPONÍVEIS`;ui.roulette.hidden=false;
    ui.rouletteLabels.style.transition='none';ui.rouletteLabels.style.transform='translateX(0)';startRouletteSound(spinDuration);requestAnimationFrame(()=>requestAnimationFrame(()=>{const winningCard=ui.rouletteLabels.querySelector('.is-winner-target'),targetCenter=winningCard.offsetLeft+winningCard.offsetWidth/2,viewportCenter=ui.rouletteWheel.clientWidth/2,landingOffset=(Math.random()-.5)*Math.min(12,winningCard.offsetWidth*.16);ui.rouletteLabels.style.transition=`transform ${spinDuration/1000}s cubic-bezier(.08,.67,.08,1)`;ui.rouletteLabels.style.transform=`translateX(${viewportCenter-targetCenter+landingOffset}px)`}));
    if(impactReveal)setTimeout(()=>{if(draftId!==state.videoDraftId)return;const winningCard=ui.rouletteLabels.querySelector('.is-winner-target'),targetCenter=winningCard.offsetLeft+winningCard.offsetWidth/2,viewportCenter=ui.rouletteWheel.clientWidth/2;ui.rouletteLabels.style.transition='transform .2s cubic-bezier(.12,.9,.2,1)';ui.rouletteLabels.style.transform=`translateX(${viewportCenter-targetCenter}px)`;showVideoForcedReveal(selected,playerName)},spinDuration*.52);
    setTimeout(()=>{if(draftId!==state.videoDraftId)return;videoForcedReveal.hidden=true;ui.roulette.classList.remove('is-forced-impact');playRouletteLandSound();const entryDuration=playEntryVoice(selected,entryVoice),winningSlice=ui.rouletteLabels.querySelector('.is-winner-target');showVideoEntryReveal(selected,playerName,state.videoPlayerAvatars[playerIndex]||'',entryVoice,entryDuration);if(winningSlice)winningSlice.classList.add('is-selected');ui.rouletteTier.textContent=characterDisplayName(selected);ui.rouletteTier.style.color=tierConfig[characterTier(selected)].color;ui.rouletteViewer.textContent=`${playerName} • ENTRANDO NA ARENA`;videoBattleStatus.textContent=`${picked.length+1}/6 • ${playerName} recebeu ${characterDisplayName(selected)}`;setTimeout(()=>{if(draftId!==state.videoDraftId)return;ui.roulette.hidden=true;spawnBall(playerName,selected,'video',state.videoPlayerAvatars[playerIndex]||'');picked.push(selected);videoBattleStatus.textContent=`${picked.length}/6 na arena • próximo sorteio em instantes`;const finalVoice=picked.length>=6,nextDelay=Math.max(250,entryDuration-(finalVoice?550:1050));setTimeout(()=>spinVideoDraftRound(draftId,picked),nextDelay)},700)},spinDuration+180);
  }

  function startVideoCountdown(draftId,picked) {
    if(draftId!==state.videoDraftId)return;ui.roulette.hidden=true;videoCountdown.hidden=false;videoCountdown.classList.remove('is-draw-title');videoCountdownLabel.textContent='OS 6 ESTÃO PRONTOS';const steps=['3','2','1','BATALHA!'];let step=0;
    const advance=()=>{if(draftId!==state.videoDraftId)return;if(step>=steps.length){videoCountdown.hidden=true;state.videoIntroActive=false;state.videoBattleStarted=true;state.videoBattleStartedAt=state.time;state.running=true;state.lastTime=performance.now();videoPauseButton.disabled=false;videoPauseButton.textContent='Ⅱ PAUSAR';videoGenerateButton.disabled=false;videoGenerateButton.textContent='↻ NOVO SORTEIO';videoBattleStatus.textContent=`Batalha em andamento • paredes fecham em ${VIDEO_ARENA_SHRINK_DELAY}s • ${picked.map(characterDisplayName).join(' × ')}`;return}const currentStep=steps[step];videoCountdownValue.textContent=currentStep;videoCountdown.classList.toggle('is-battle',currentStep==='BATALHA!');videoCountdownValue.style.animation='none';void videoCountdownValue.offsetWidth;videoCountdownValue.style.animation='';playCountdownSound(currentStep);step+=1;setTimeout(advance,currentStep==='BATALHA!'?1300:1100)};
    advance();
  }

  function sanitizeName(value) { return value.trim().replace(/[^a-zA-Z0-9_.-]/g,'').slice(0,18); }
  function characterList(tier) { return TIER_CHARACTER_POOLS[tier]||[]; }
  function characterDisplayName(character) { return character==='char1'?'ZENITSU':character==='char2'?'MEGUMIN':character==='char3'?'YOR':character==='char4'?'THORFINN':character==='char5'?'SINGED':character==='char6'?'SUBARU':character==='char7'?'GENOS':character==='char8'?'SUNG JIN-WOO':character==='char9'?'TANJIRO':character==='char10'?'ITADORI':character==='char11'?'ESCANOR':character==='char12'?'BOMBERMAN':character==='char13'?'HITSUGAYA':character==='char14'?'KILLUA':character==='char15'?'ISAGI':character==='char16'?'MIDORIYA':character==='char17'?'RUDEUS':character==='char18'?'KIRITO':character==='char19'?'LELOUCH':character==='char20'?'SAITAMA':character==='char21'?'ICHIGO':character==='char22'?'LUFFY':character==='char23'?'DENJI':character==='char24'?'EREN':character==='char25'?'NARUTO':character==='char26'?'PIKACHU':character==='char27'?'EDWARD':character==='char28'?'RIMURU':character==='char29'?'GOKU':character==='char30'?'GOJO':character==='char31'?'SHIKAMARU':character==='char32'?'NAMI':character==='char33'?'MINATO':character==='char34'?'CAIN':character==='char35'?'METAL BAT':character.toUpperCase(); }
  const roulettePortraits={char1:['zenitsu.png','50% 28%'],char2:['megumin.png','50% 18%'],char3:['yor.png','50% 18%'],char4:['thorfin.png','50% 20%'],char5:['singed.png','50% 14%'],char6:['subaru-full.png','58% 48%'],char7:['genos.png','50% 12%'],char8:['sung.png','58% 12%'],char9:['tanjiro.png','50% 12%'],char10:['itadori.png','58% 10%'],char11:['escanor-full.png','48% 22%'],char12:['bomberman-full.png','50% 45%'],char13:['hitsugaya.png','50% 28%'],char14:['killua.png','50% 14%'],char15:['isagi.png','50% 12%'],char16:['midoriya.png','53% 35%'],char17:['rudeus.png','50% 15%'],char18:['kirito.png','50% 13%'],char19:['lelouch.png','50% 12%'],char20:['saitama.png','50% 13%'],char21:['ichigo.png','50% 22%'],char22:['luffy-full.png?v=20261025-26','50% 40%','125% auto'],char23:['denji-full.png?v=20261025-26','50% 12%','auto 265%'],char24:['eren-full.png','38% 25%'],char25:['naruto-full.png','45% 18%'],char26:['pikachu-full.png','57% 50%'],char27:['edward-full.png','50% 35%'],char28:['rimuru-full.png','50% 32%'],char29:['goku-full.png','38% 35%'],char30:['gojo-full.png','50% 35%'],char31:['shikamaru.png','50% 25%'],char32:['nami.png','66% 38%'],char33:['minato.png','58% 24%'],char34:['cain.png','50% 15%','175% auto'],char35:['metalbat.png','43% 16%']};
  function roulettePortrait(character) { const [file,position,size='cover']=roulettePortraits[character];return{url:`./assets/${file}`,position,size}; }
  const characterSoundOverrides={char35:{intro:'./assets/audio/char35-intro.mp3?v=20261113-01',hit:'./assets/audio/char35-hit.mp3?v=20261113-01'}};
  const activeCharacterAudio=new Map();
  const duckingAudio=new Set(),audioDuckReleases=new WeakMap();
  const BACKGROUND_TRACKS={
    'cyber-runner':{name:'Cyber Runner',src:'./assets/audio/background-cyber-runner.mp3?v=20261027-01'},
    'hard-battle':{name:'Hard Battle',src:'./assets/audio/background-hard-battle.mp3?v=20261113-01'},
    'jrpg-rock':{name:'JRPG Rock',src:'./assets/audio/background-jrpg-rock.mp3?v=20261113-01'},
    'midi-battle':{name:'Retro Boss',src:'./assets/audio/background-midi-battle.mp3?v=20261113-01'}
  };
  const BACKGROUND_TRACK_STORAGE_KEY='anime-neom:background-track';
  function savedBackgroundTrack(){try{const saved=localStorage.getItem(BACKGROUND_TRACK_STORAGE_KEY);return BACKGROUND_TRACKS[saved]?saved:'cyber-runner'}catch{return'cyber-runner'}}
  let backgroundTrackId=savedBackgroundTrack();
  const backgroundMusic=new Audio(BACKGROUND_TRACKS[backgroundTrackId].src);
  backgroundMusic.loop=true;backgroundMusic.preload='auto';backgroundMusic.volume=.078;
  const battleGoAudio=new Audio('./assets/audio/go.mp3?v=20261029-01'),koAudios=[new Audio('./assets/audio/ko.mp3?v=20261029-01'),new Audio('./assets/audio/ko.mp3?v=20261029-01')];
  battleGoAudio.preload='auto';for(const audio of koAudios)audio.preload='auto';
  const entryVoiceCache=new Map();
  let musicEnabled=true,musicStarted=false,musicFadeFrame=0,sfxAudioContext=null,rouletteTickTimer=null,rouletteTickRun=0,koAudioIndex=0,activeEntryVoice=null,entryRevealRun=0;
  let selectedAudioCharacter=null;
  function updateMusicButton() {
    const playing=musicStarted&&musicEnabled&&!backgroundMusic.paused,trackName=BACKGROUND_TRACKS[backgroundTrackId].name;musicToggle.classList.toggle('is-playing',playing);musicToggle.classList.toggle('is-muted',!musicEnabled);musicToggle.setAttribute('aria-pressed',String(playing));musicToggle.setAttribute('aria-label',playing?`Desativar ${trackName}`:`Ativar ${trackName}`);musicToggle.title=playing?`${trackName} tocando • toque para silenciar`:`${trackName} desligada • toque para ativar`;
  }
  function fadeMusicVolume(target,duration=220) {
    cancelAnimationFrame(musicFadeFrame);const initial=backgroundMusic.volume,start=performance.now(),step=now=>{const progress=Math.min(1,(now-start)/duration),eased=progress*(2-progress);backgroundMusic.volume=initial+(target-initial)*eased;if(progress<1)musicFadeFrame=requestAnimationFrame(step)};musicFadeFrame=requestAnimationFrame(step);
  }
  function syncMusicMix() { if(!musicEnabled||!musicStarted)return;fadeMusicVolume(duckingAudio.size ? .022 : .078); }
  function releaseAudioDuck(audio) { const release=audioDuckReleases.get(audio);if(release)release(); }
  function beginAudioDuck(audio) {
    releaseAudioDuck(audio);duckingAudio.add(audio);let released=false;const release=()=>{if(released||audioDuckReleases.get(audio)!==release)return;released=true;audioDuckReleases.delete(audio);duckingAudio.delete(audio);syncMusicMix()};audioDuckReleases.set(audio,release);syncMusicMix();return release;
  }
  function startBackgroundMusic() {
    if(!musicEnabled)return;musicStarted=true;backgroundMusic.play().then(()=>{syncMusicMix();updateMusicButton()}).catch(()=>{musicStarted=false;updateMusicButton()});
  }
  function toggleBackgroundMusic() {
    if(!musicStarted||backgroundMusic.paused){musicEnabled=true;startBackgroundMusic();return}musicEnabled=false;cancelAnimationFrame(musicFadeFrame);backgroundMusic.pause();updateMusicButton();
  }
  function selectBackgroundTrack(trackId) {
    if(!BACKGROUND_TRACKS[trackId]||trackId===backgroundTrackId)return;backgroundTrackId=trackId;cancelAnimationFrame(musicFadeFrame);backgroundMusic.pause();backgroundMusic.currentTime=0;backgroundMusic.src=BACKGROUND_TRACKS[trackId].src;backgroundMusic.load();musicSelect.value=trackId;try{localStorage.setItem(BACKGROUND_TRACK_STORAGE_KEY,trackId)}catch{/* A seleção continua válida nesta sessão. */}if(musicEnabled)startBackgroundMusic();else updateMusicButton();
  }
  function getSfxAudioContext() {
    if(!sfxAudioContext){const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)return null;sfxAudioContext=new AudioContext()}if(sfxAudioContext.state==='suspended')sfxAudioContext.resume().catch(()=>{});return sfxAudioContext;
  }
  function synthTone(frequency,delay,duration,volume=.1,type='square') {
    const audioContext=getSfxAudioContext();if(!audioContext)return;const start=audioContext.currentTime+delay,oscillator=audioContext.createOscillator(),gain=audioContext.createGain();oscillator.type=type;oscillator.frequency.setValueAtTime(frequency,start);gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(volume,start+.018);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);oscillator.connect(gain).connect(audioContext.destination);oscillator.start(start);oscillator.stop(start+duration+.03);
  }
  function stopRouletteSound() { rouletteTickRun+=1;if(rouletteTickTimer){clearTimeout(rouletteTickTimer);rouletteTickTimer=null} }
  function startRouletteSound(duration) {
    stopRouletteSound();const run=rouletteTickRun,start=performance.now();let tickIndex=0;const tick=()=>{if(run!==rouletteTickRun)return;const progress=Math.min(1,(performance.now()-start)/duration);if(progress>=.985){rouletteTickTimer=null;return}const frequency=1120-progress*360+(tickIndex%2?45:0);synthTone(frequency,0,.038,.022,'square');tickIndex+=1;const interval=34+Math.pow(progress,2.35)*205;rouletteTickTimer=setTimeout(tick,interval)};tick();
  }
  function playRouletteLandSound() { stopRouletteSound();synthTone(660,0,.12,.055,'triangle');synthTone(990,.065,.22,.05,'sine'); }
  function playForcedImpactSound(){stopRouletteSound();synthTone(92,0,.5,.17,'sawtooth');synthTone(46,.02,.68,.12,'square');synthTone(760,.08,.14,.075,'square');synthTone(1180,.13,.25,.045,'triangle')}
  function showVideoForcedReveal(character,playerName){const portrait=roulettePortrait(character);videoForcedReveal.style.setProperty('--forced-color',tierConfig[characterTier(character)].color);videoForcedPortrait.style.backgroundImage=`linear-gradient(180deg,rgba(3,5,15,.01),rgba(3,5,15,.25)),url('${portrait.url}')`;videoForcedPortrait.style.backgroundPosition=portrait.position;videoForcedPortrait.style.backgroundSize=portrait.size;videoForcedCharacter.textContent=characterDisplayName(character);videoForcedPlayer.textContent=playerName;ui.roulette.classList.remove('is-forced-impact');void ui.roulette.offsetWidth;ui.roulette.classList.add('is-forced-impact');videoForcedReveal.hidden=false;playForcedImpactSound();setTimeout(()=>{videoForcedReveal.hidden=true;ui.roulette.classList.remove('is-forced-impact')},950)}
  function playFixedAudio(audio,volume=.8,duck=true) {
    releaseAudioDuck(audio);audio.pause();audio.currentTime=0;audio.volume=volume;if(duck){audio.addEventListener('playing',()=>beginAudioDuck(audio),{once:true});audio.addEventListener('ended',()=>releaseAudioDuck(audio),{once:true});audio.addEventListener('error',()=>releaseAudioDuck(audio),{once:true})}audio.play().catch(()=>releaseAudioDuck(audio));
  }
  function prepareEntryVoice(character) {
    if(entryVoiceCache.has(character))return entryVoiceCache.get(character);const number=Number(character.slice(4)),version=character==='char35'?'20261113-01':'20261105-02',audio=new Audio(`./assets/audio/initial_voice/char${number}-entry.mp3?v=${version}`);audio.preload='auto';audio.load();entryVoiceCache.set(character,audio);return audio;
  }
  function hideVideoEntryReveal() { entryRevealRun+=1;videoEntryReveal.hidden=true; }
  function ensureVideoEntryPlayerAvatar(){
    if(videoEntryPlayerAvatar)return videoEntryPlayerAvatar;if(!videoEntryPortrait)return null;videoEntryPlayerAvatar=document.createElement('span');videoEntryPlayerAvatar.id='videoEntryPlayerAvatar';videoEntryPlayerAvatar.className='video-entry-reveal__player-avatar';videoEntryPlayerAvatar.setAttribute('aria-label','Avatar do jogador');videoEntryPortrait.appendChild(videoEntryPlayerAvatar);return videoEntryPlayerAvatar;
  }
  function showVideoEntryReveal(character,playerName,playerAvatarUrl,audio,duration) {
    const run=++entryRevealRun,portrait=roulettePortrait(character),playerAvatar=ensureVideoEntryPlayerAvatar(),hide=()=>{if(run===entryRevealRun)videoEntryReveal.hidden=true};videoEntryReveal.style.setProperty('--entry-color',tierConfig[characterTier(character)].color);videoEntryPortrait.style.backgroundImage=`linear-gradient(180deg,rgba(3,5,15,.01),rgba(3,5,15,.3)),url('${portrait.url}')`;videoEntryPortrait.style.backgroundPosition=portrait.position;videoEntryPortrait.style.backgroundSize=portrait.size;if(playerAvatar){playerAvatar.hidden=!playerAvatarUrl;playerAvatar.style.backgroundImage=playerAvatarUrl?`url('${playerAvatarUrl}')`:'';playerAvatar.textContent='';playerAvatar.setAttribute('aria-label',playerAvatarUrl?`Avatar de ${playerName}`:'Sem avatar')}videoEntryCharacter.textContent=characterDisplayName(character);videoEntryPlayer.textContent=playerName;videoEntryReveal.hidden=false;audio.addEventListener('ended',hide,{once:true});audio.addEventListener('error',hide,{once:true});setTimeout(hide,Number.isFinite(audio.duration)&&audio.duration>0?duration+350:15000);
  }
  function stopEntryVoice() {
    hideVideoEntryReveal();if(!activeEntryVoice)return;releaseAudioDuck(activeEntryVoice);activeEntryVoice.pause();activeEntryVoice.currentTime=0;activeEntryVoice=null;
  }
  function playEntryVoice(character,audio=prepareEntryVoice(character)) {
    stopEntryVoice();activeEntryVoice=audio;const seconds=Number.isFinite(audio.duration)&&audio.duration>0?audio.duration:2.2;audio.addEventListener('ended',()=>{if(activeEntryVoice===audio)activeEntryVoice=null},{once:true});audio.addEventListener('error',()=>{if(activeEntryVoice===audio)activeEntryVoice=null},{once:true});playFixedAudio(audio,.78,true);return Math.max(450,seconds*1000);
  }
  function playKoSound() {
    const audio=koAudios[koAudioIndex++%koAudios.length];playFixedAudio(audio,.76,true);return audio;
  }
  function playCountdownSound(step) {
    if(step==='BATALHA!'){playFixedAudio(battleGoAudio,.9,true);return}const index=Number(step),frequency=index===3?440:index===2?554:698;synthTone(frequency,0,.18,.09,'square');synthTone(frequency*2,.015,.12,.035,'sine');
  }
  function playVictoryFanfare() {
    const notes=[[523,0],[659,.12],[784,.24],[1047,.42],[784,.7],[1047,.83]];for(const [frequency,delay] of notes){synthTone(frequency,delay,delay<.4?.3:.62,.085,'triangle');synthTone(frequency/2,delay,.42,.035,'sine')}
  }
  function interruptMusicForVictory() {
    cancelAnimationFrame(musicFadeFrame);backgroundMusic.pause();backgroundMusic.currentTime=0;updateMusicButton();playVictoryFanfare();
  }
  function characterSoundUrl(character,cue='intro') { return characterSoundOverrides[character]?.[cue]||`./assets/audio/${character}-${cue}.mp3?v=20261105-07`; }
  function playCharacterCue(character,cue='power',options={}) {
    const preview=options.preview===true,owners=options.owner?[options.owner]:!preview?state.balls.filter(ball=>ball.character===character&&!ball.dead):[],audio=preview?characterPreviewAudio:new Audio(),url=characterSoundUrl(character,cue);releaseAudioDuck(audio);audio.pause();audio.src=url;audio.currentTime=0;audio.volume=preview?Number(characterAudioVolume.value):Math.max(0,Math.min(1,options.volume??.8));let cleanup=()=>{};
    if(preview){selectedAudioCharacter=character;characterAudioName.textContent=characterDisplayName(character);characterAudioStatus.textContent=`CARREGANDO • ${cue.toUpperCase()}`;characterAudioReplay.disabled=false;charactersGallery.querySelectorAll('.character-guide-card').forEach(card=>card.classList.toggle('is-audio-selected',card.dataset.character===character))}
    if(!preview&&owners.length){for(const owner of owners){if(owner?.id==null)continue;if(!activeCharacterAudio.has(owner.id))activeCharacterAudio.set(owner.id,new Set());activeCharacterAudio.get(owner.id).add(audio)}cleanup=()=>{for(const owner of owners){const active=activeCharacterAudio.get(owner?.id);if(!active)continue;active.delete(audio);if(!active.size)activeCharacterAudio.delete(owner.id)}};audio.addEventListener('ended',cleanup,{once:true});audio.addEventListener('error',cleanup,{once:true})}
    audio.addEventListener('playing',()=>beginAudioDuck(audio),{once:true});audio.addEventListener('ended',()=>releaseAudioDuck(audio),{once:true});audio.addEventListener('error',()=>releaseAudioDuck(audio),{once:true});audio.play().catch(()=>{cleanup();releaseAudioDuck(audio);if(preview&&selectedAudioCharacter===character)characterAudioStatus.textContent=`SEM ÁUDIO • adicione ${character}-${cue}.mp3`});return audio;
  }
  function stopCharacterAudio(owner) { const active=activeCharacterAudio.get(owner?.id);if(!active)return;for(const audio of [...active]){releaseAudioDuck(audio);audio.pause();audio.currentTime=0;audio.removeAttribute('src');audio.load();for(const [id,audios] of activeCharacterAudio){audios.delete(audio);if(!audios.size)activeCharacterAudio.delete(id)}}activeCharacterAudio.delete(owner.id); }
  function stopAllCharacterAudio() { for(const active of activeCharacterAudio.values())for(const audio of active){releaseAudioDuck(audio);audio.pause();audio.currentTime=0;audio.removeAttribute('src');audio.load()}activeCharacterAudio.clear(); }
  function renderCharactersGallery() {
    if(charactersGallery.childElementCount)return;
    charactersGallery.innerHTML=ALL_CHARACTERS.map((character,index)=>{
      const tier=characterTier(character),portrait=roulettePortrait(character),config=tierConfig[tier];
      return `<button class="character-guide-card" type="button" data-character="${character}" aria-label="Ouvir apresentação de ${characterDisplayName(character)}" style="--character-color:${config.color}"><span class="character-guide-avatar" style="background-image:linear-gradient(180deg,rgba(7,8,23,.03),rgba(7,8,23,.18) 58%,rgba(7,8,23,.82)),url('${portrait.url}');background-position:${portrait.position};background-size:${portrait.size}"></span><strong>${characterDisplayName(character)}</strong><small>CHAR ${String(index+1).padStart(2,'0')} · ${config.shortLabel}</small><i aria-hidden="true">♪</i></button>`;
    }).join('');
  }
  function openCharactersModal() { renderCharactersGallery();document.body.classList.add('characters-modal-open');charactersModal.showModal(); }
  function closeCharactersModal() { charactersModal.close(); }
  function setButtonsDisabled(disabled) { document.querySelectorAll('.donation').forEach(button=>{button.disabled=disabled}); }

  function runRoulette(tier,donationMeta=null) {
    if(state.spinning)return;
    const nick=sanitizeName(ui.viewer.value);
    if(!nick){ui.error.textContent='Digite o nick da pessoa antes de escolher a doação.';ui.viewer.focus();return}
    activeLiveDonation=donationMeta;
    const activeBall=state.balls.find(ball=>!ball.isClone&&ball.nick.toLowerCase()===nick.toLowerCase());
    if(activeBall){healBall(activeBall,tier,donationMeta);return}
    ui.error.textContent=''; state.spinning=true; setButtonsDisabled(true);
    spinRoulette(nick,tier);
  }

  function buildLiveRouletteStrip(entries,selected,targetIndex,length=46){
    const strip=[];while(strip.length<length){const cycle=[...entries];for(let index=cycle.length-1;index>0;index--){const swapIndex=Math.floor(Math.random()*(index+1));[cycle[index],cycle[swapIndex]]=[cycle[swapIndex],cycle[index]]}if(strip.length&&cycle.length>1&&cycle[0]===strip[strip.length-1]){const swapIndex=cycle.findIndex(entry=>entry!==strip[strip.length-1]);[cycle[0],cycle[swapIndex]]=[cycle[swapIndex],cycle[0]]}strip.push(...cycle)}strip.length=length;strip[targetIndex]=selected;
    for(let index=Math.max(1,targetIndex-3);index<=Math.min(strip.length-2,targetIndex+3);index++){if(index===targetIndex||strip[index]!==selected)continue;const replacement=entries.find(entry=>entry!==selected&&entry!==strip[index-1]&&entry!==strip[index+1]);if(replacement)strip[index]=replacement}
    return strip;
  }
  function spinLiveHorizontalRoulette(nick,tier,config,entries,selected,upgradeTier){
    const targetIndex=34,strip=buildLiveRouletteStrip(entries,selected,targetIndex),duration=2400;
    ui.roulette.hidden=true;liveRoulette.hidden=false;liveRoulette.classList.remove('is-result','is-upgrade');liveRoulette.style.setProperty('--live-tier-color',config.color);liveRouletteName.textContent='SORTEANDO';liveRouletteViewer.textContent=`@${nick}`;
    liveRouletteTrack.innerHTML=strip.map((entry,index)=>{if(entry==='upgrade')return`<span class="live-roulette-card live-roulette-card--upgrade${index===targetIndex?' is-target':''}"><i>↑</i><b>UPGRADE</b></span>`;const portrait=roulettePortrait(entry);return`<span class="live-roulette-card${index===targetIndex?' is-target':''}"><i style="background-image:url('${portrait.url}');background-position:${portrait.position};background-size:${portrait.size}"></i><b>${characterDisplayName(entry)}</b></span>`}).join('');
    liveRouletteTrack.style.transition='none';liveRouletteTrack.style.transform='translateX(0)';startRouletteSound(duration);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{const target=liveRouletteTrack.querySelector('.is-target'),targetCenter=target.offsetLeft+target.offsetWidth/2,viewportCenter=liveRouletteTrack.parentElement.clientWidth/2,landingOffset=(Math.random()-.5)*Math.min(10,target.offsetWidth*.12);liveRouletteTrack.style.transition=`transform ${duration/1000}s cubic-bezier(.08,.67,.08,1)`;liveRouletteTrack.style.transform=`translateX(${viewportCenter-targetCenter+landingOffset}px)`}));
    setTimeout(()=>{playRouletteLandSound();if(selected==='upgrade')showRouletteUpgrade(nick,upgradeTier);else showResult(nick,selected,tier)},duration+140);
  }

  function spinRoulette(nick,tier) {
    const config=tierConfig[tier],characters=characterList(tier),upgradeTier=activeLiveDonation?.isBot?null:tier==='small'?'medium':tier==='medium'?'large':null,entries=upgradeTier?[...characters,'upgrade']:characters,segmentAngle=360/entries.length,selectedIndex=Math.floor(Math.random()*entries.length),selected=entries[selectedIndex],wheelColors=entries.map((entry,index)=>`${entry==='upgrade'?'#f6bd32':index%2?config.color:'#252947'} ${index*segmentAngle}deg ${(index+1)*segmentAngle}deg`).join(',');
    if(state.viewMode==='live'){if(selected!=='upgrade')prepareEntryVoice(selected);spinLiveHorizontalRoulette(nick,tier,config,entries,selected,upgradeTier);return}
    ui.rouletteWheel.classList.remove('roulette-wheel--upgrade');ui.rouletteWheel.style.setProperty('--segment-angle',`${segmentAngle}deg`);ui.rouletteWheel.style.setProperty('--wheel-start',`${-segmentAngle/2}deg`);ui.rouletteWheel.style.background=`conic-gradient(from ${-segmentAngle/2}deg,${wheelColors})`;
    ui.rouletteLabels.innerHTML=entries.map((entry,index)=>{const rotation=index*segmentAngle;if(entry==='upgrade')return`<span class="roulette-label roulette-label--upgrade" style="--segment-color:#f6bd32;transform:rotate(${rotation}deg) translateY(-80px)"><span class="roulette-upgrade-glow"></span><span class="roulette-upgrade-icon">⬆</span><b>UPGRADE</b><small>PRÓXIMO TIER</small></span>`;const portrait=roulettePortrait(entry),segmentColor=index%2?config.color:'#333858';return`<span class="roulette-label" style="--segment-color:${segmentColor};transform:rotate(${rotation}deg) translateY(-80px)"><span class="roulette-portrait" style="background-image:linear-gradient(180deg,rgba(3,5,15,.06),rgba(3,5,15,.38) 52%,rgba(3,5,15,.94)),url('${portrait.url}');background-position:${portrait.position};background-size:${portrait.size}"></span><b>${characterDisplayName(entry)}</b><small>${entry.toUpperCase()}</small></span>`}).join('');
    ui.rouletteTier.textContent=config.label; ui.rouletteTier.style.color=config.color; ui.rouletteViewer.textContent=`@${nick}`; ui.roulette.hidden=false;startRouletteSound(3000);
    requestAnimationFrame(()=>{
      const targetModulo=(360-selectedIndex*segmentAngle)%360;
      const currentModulo=((state.wheelRotation%360)+360)%360;
      const extraTurns=5+Math.floor(Math.random()*3);
      state.wheelRotation+=((targetModulo-currentModulo+360)%360)+extraTurns*360;
      ui.rouletteWheel.style.transition='transform 3s cubic-bezier(.08,.65,.12,1)';
      ui.rouletteWheel.style.transform=`rotate(${state.wheelRotation}deg)`;
    });
    setTimeout(()=>{playRouletteLandSound();if(selected==='upgrade')showRouletteUpgrade(nick,upgradeTier);else showResult(nick,selected,tier)},3150);
  }

  function showRouletteUpgrade(nick,nextTier) {
    if(state.viewMode==='live'){liveRoulette.classList.add('is-result','is-upgrade');liveRouletteName.textContent='UPGRADE';liveRouletteViewer.textContent=`@${nick}`;setTimeout(()=>spinRoulette(nick,nextTier),700);return}
    const nextConfig=tierConfig[nextTier];ui.rouletteWheel.classList.add('roulette-wheel--upgrade');ui.rouletteTier.textContent=`★ UPGRADE! SUBINDO PARA DOAÇÃO ${nextConfig.shortLabel}`;ui.rouletteTier.style.color='#ffd15c';ui.rouletteViewer.textContent=`@${nick} ganhou uma nova roleta!`;setTimeout(()=>spinRoulette(nick,nextTier),950);
  }

  function showResult(nick,character,tier) {
    const config=tierConfig[tier],donationMeta=activeLiveDonation,isBot=donationMeta?.isBot===true;
    if(state.viewMode==='live'){liveRoulette.classList.add('is-result');liveRouletteName.textContent=characterDisplayName(character);liveRouletteViewer.textContent=`@${nick}`;setTimeout(async()=>{const avatarUrl=await readyLiveDonationAvatar(donationMeta),goesToQueue=playerBallCount()>=MAX_BALLS;liveRoulette.hidden=true;liveRoulette.classList.remove('is-result','is-upgrade');activeLiveDonation=null;if(goesToQueue){enqueuePlayer(nick,character,tier,avatarUrl,isBot);ui.viewer.value='';state.spinning=false;setButtonsDisabled(false)}else startLiveArenaEntry({nick,character,tier,avatarUrl,isBot},()=>{ui.viewer.value=''})},900);return}
    const goesToQueue=playerBallCount()>=MAX_BALLS;
    ui.rouletteWheel.classList.remove('roulette-wheel--upgrade');ui.roulette.hidden=true;ui.resultLabel.textContent=goesToQueue?'ARENA CHEIA • ENTRADA NA FILA':'PERSONAGEM SORTEADO';ui.resultCharacter.textContent=`${characterDisplayName(character)} • ${character.toUpperCase()}`;ui.resultCharacter.style.color=character==='char11'?'#ffbd42':character==='char12'?'#ff8ac2':character==='char13'?'#9cecff':character==='char14'?'#91dcff':character==='char15'?'#77a9ff':character==='char16'?'#62f5ba':character==='char17'?'#b4ef72':character==='char21'?'#ff5269':character==='char22'?'#ffc44a':character==='char23'?'#c7cdd5':character==='char24'?'#74ffa9':character==='char25'?'#62d7ff':character==='char26'?'#ffe342':character==='char27'?'#7cecff':character==='char28'?'#9cecff':character==='char29'?'#ffd45e':character==='char30'?'#c7a7ff':character==='char31'?'#b6d68d':character==='char32'?'#75e1ff':character==='char33'?'#ffe36b':character==='char34'?'#d7c9ff':character==='char35'?'#ff765f':config.color;ui.resultViewer.textContent=goesToQueue?`@${nick} está aguardando uma vaga`:`@${nick} entrou na arena!`;ui.result.hidden=false;
    if(character==='char18'){ui.resultCharacter.textContent='KIRITO • CHAR18';ui.resultCharacter.style.color='#70e8ff'}
    if(character==='char19'){ui.resultCharacter.textContent='LELOUCH • CHAR19';ui.resultCharacter.style.color='#ff4c7d'}
    if(character==='char20'){ui.resultCharacter.textContent='SAITAMA • CHAR20';ui.resultCharacter.style.color='#ffcf59'}
    if(character==='char1'){ui.resultCharacter.textContent='ZENITSU • CHAR1';ui.resultCharacter.style.color='#ffe251'}
    if(character==='char2'){ui.resultCharacter.textContent='MEGUMIN • CHAR2';ui.resultCharacter.style.color='#ff6b62'}
    if(character==='char3'){ui.resultCharacter.textContent='YOR • CHAR3';ui.resultCharacter.style.color='#f0ca4e'}
    if(character==='char4'){ui.resultCharacter.textContent='THORFINN • CHAR4';ui.resultCharacter.style.color='#d5f3a4'}
    if(character==='char5'){ui.resultCharacter.textContent='SINGED • CHAR5';ui.resultCharacter.style.color='#9ef58e'}
    if(character==='char6'){ui.resultCharacter.textContent='SUBARU • CHAR6';ui.resultCharacter.style.color='#d3a4ff'}
    if(character==='char7'){ui.resultCharacter.textContent='GENOS • CHAR7';ui.resultCharacter.style.color='#ffbd68'}
    if(character==='char8'){ui.resultCharacter.textContent='SUNG JIN-WOO • CHAR8';ui.resultCharacter.style.color='#8fc5ff'}
    if(character==='char9'){ui.resultCharacter.textContent='TANJIRO • CHAR9';ui.resultCharacter.style.color='#68e8ff'}
    if(character==='char10'){ui.resultCharacter.textContent='ITADORI • CHAR10';ui.resultCharacter.style.color='#ff7184'}
    setTimeout(()=>{ui.result.hidden=true;if(goesToQueue)enqueuePlayer(nick,character,tier);else spawnBall(nick,character,tier);ui.viewer.value='';state.spinning=false;setButtonsDisabled(false)},900);
  }

  function healBall(ball,tier,donationMeta=null) {
    const config=tierConfig[tier]; state.spinning=true;setButtonsDisabled(true);ui.error.textContent='';
    if(donationMeta?.avatarUrl)ball.profile.avatarUrl=donationMeta.avatarUrl;
    const healAmount=donationMeta?.healAmount>0?donationMeta.healAmount:config.heal,previous=ball.hp;ball.hp=Math.min(ball.maxHp,ball.hp+healAmount);const restored=Math.round(ball.hp-previous);
    if(state.viewMode==='live'){
      createBurst(ball.x,ball.y,'#66ffa8',10);state.floaters.push({x:ball.x,y:ball.y-ball.radius-10,color:'#82ffb5',text:restored?`+${restored} HP`:'VIDA CHEIA',life:1.05,maxLife:1.05});
      liveRoulette.hidden=false;liveRoulette.classList.remove('is-result','is-upgrade');liveRoulette.classList.add('is-heal');liveRoulette.style.setProperty('--live-tier-color','#66ffa8');liveRouletteTrack.style.transition='none';liveRouletteTrack.style.transform='none';liveRouletteTrack.innerHTML=`<span class="live-heal-feedback"><i>+</i><b>${Math.round(ball.hp)}/${Math.round(ball.maxHp)} HP</b></span>`;liveRouletteName.textContent=restored?`CURA +${restored} HP`:'VIDA CHEIA';liveRouletteViewer.textContent=`@${ball.nick}`;
      setTimeout(()=>{liveRoulette.hidden=true;liveRoulette.classList.remove('is-heal');ui.viewer.value='';activeLiveDonation=null;state.spinning=false;setButtonsDisabled(false)},900);return
    }
    createBurst(ball.x,ball.y,'#66ffa8',24);ui.resultLabel.textContent=`DOAÇÃO ${config.shortLabel} • CURA`;ui.resultCharacter.textContent=restored?`+${restored} HP`:'VIDA CHEIA';ui.resultCharacter.style.color='#66ffa8';ui.resultViewer.textContent=`@${ball.nick} continua com ${Math.round(ball.hp)}/${ball.maxHp} HP`;ui.result.hidden=false;
    setTimeout(()=>{ui.result.hidden=true;ui.viewer.value='';state.spinning=false;setButtonsDisabled(false)},900);
  }

  function findFreePosition(radius) {
    const bounds=arenaBounds(),margin=radius+7,left=bounds.left+margin,right=bounds.right-margin,top=bounds.top+margin,bottom=bounds.bottom-margin;
    const isFree=(x,y)=>state.balls.every(ball=>Math.hypot(ball.x-x,ball.y-y)>=ball.radius+radius+14);
    for(let attempt=0;attempt<160;attempt++){const x=left+Math.random()*(right-left),y=top+Math.random()*(bottom-top);if(isFree(x,y))return{x,y}}
    let best={x:state.width/2,y:state.height/2,gap:-Infinity};
    for(let row=0;row<6;row++)for(let column=0;column<6;column++){const x=left+(right-left)*(column/5),y=top+(bottom-top)*(row/5);const gap=state.balls.length?Math.min(...state.balls.map(ball=>Math.hypot(ball.x-x,ball.y-y)-ball.radius-radius)):Infinity;if(gap>best.gap)best={x,y,gap}}
    return{x:best.x,y:best.y};
  }

  function getProfile(nick,color,character,avatarUrl='',isBot=false) {
    const key=nick.toLowerCase();
    if(!state.profiles.has(key))state.profiles.set(key,{nick,color,score:0,damage:0,kos:0,entries:0,active:false,lastCharacter:character,eliminatedAt:0,avatarUrl:'',isBot});
    const profile=state.profiles.get(key);profile.nick=nick;profile.color=color;profile.entries+=1;profile.active=true;profile.lastCharacter=character;profile.isBot=isBot;if(avatarUrl)profile.avatarUrl=avatarUrl;return profile;
  }

  function spawnBall(nick,character,tier,avatarUrl='',isBot=false) {
    if(playerBallCount()>=MAX_BALLS){enqueuePlayer(nick,character,tier,avatarUrl,isBot);return}
    const config=tierConfig[tier]; const number=Number(character.slice(4)); const color=character==='char2'?'#e43f45':character==='char3'?'#c82845':character==='char4'?'#94c96b':character==='char5'?'#53c957':character==='char6'?'#8e4fc5':character==='char7'?'#f08a32':character==='char8'?'#4b74e4':character==='char9'?'#31bfcf':character==='char10'?'#db4059':character==='char11'?'#f5a623':character==='char12'?'#eb65a8':character==='char13'?'#68dff7':character==='char14'?'#55bfff':character==='char15'?'#397dff':character==='char16'?'#2bdd9e':character==='char17'?'#87c943':character==='char21'?'#ff344f':character==='char22'?'#ffb23f':character==='char23'?'#aeb6c2':character==='char24'?'#5fe594':character==='char25'?'#38bff8':character==='char26'?'#ffe342':character==='char27'?'#d8b34b':character==='char28'?'#65d9ff':character==='char29'?'#ffb52f':character==='char30'?'#a973ff':character==='char31'?'#749d55':character==='char32'?'#f08a32':character==='char33'?'#ffd94a':character==='char34'?'#8d72ff':character==='char35'?'#c43e35':palette[(number-1)%palette.length]; const radius=Math.max(27,state.width*.055); const angle=Math.random()*Math.PI*2; const moveSpeed=state.width*.18;const position=findFreePosition(radius);
    const profile=getProfile(nick,color,character,avatarUrl,isBot);
    const liveHpMultiplier=state.viewMode==='live'?2:1,id=state.nextId++;const ball={id,nick,character,tier,color,accent:config.color,profile,radius,baseRadius:radius,baseMoveSpeed:moveSpeed,moveSpeed,hp:config.maxHp*liveHpMultiplier,maxHp:config.maxHp*liveHpMultiplier,x:position.x,y:position.y,vx:Math.cos(angle)*moveSpeed,vy:Math.sin(angle)*moveSpeed,rotation:0,dead:false,isBot,isClone:false,cloneFamilyId:character==='char25'?id:null,nextCloneAt:character==='char25'?state.time+11:Infinity,nextPowerAt:character==='char25'?state.time+18:character==='char11'?state.time+14:character==='char12'?state.time+3.5:character==='char17'?state.time+8:character==='char13'||character==='char14'||character==='char26'||character==='char28'||character==='char29'?state.time+12:character==='char30'?state.time+5:character==='char16'||character==='char21'||character==='char22'?state.time+10:Infinity,sawStartedAt:state.time,sawActive:character==='char23',iceWingsUntil:0,hitsugayaSecondWaveAt:Infinity,killuaActiveUntil:0,killuaDamageMultiplier:.5,killuaComboHits:0,soccerBallSpawned:false,nextSoccerBallAt:character==='char15'?state.time+5:Infinity,isagiAudioReadyAt:0,midoriyaState:'idle',midoriyaChargeUntil:0,midoriyaDashUntil:0,rudeusForesightUntil:0,rudeusNextDodgeAt:0,rudeusDodgeUntil:0,rudeusDodges:0,rudeusAfterimageUntil:0,rudeusVisionUntil:0,rudeusVisionX:0,rudeusVisionY:0,erenForm:character==='char24'?1:0,nextErenFormAt:character==='char24'?state.time+10:Infinity,gojoCycleIndex:-1,gojoMode:'none',gojoActiveUntil:0,gojoForceTargetIds:new Set(),gojoPurpleCharging:false,gojoPurpleReleaseAt:Infinity};
    if(character==='dummy'){ball.hp=9999;ball.maxHp=9999;ball.accent='#ffd84d';ball.isTestDummy=true;ball.nextPowerAt=Infinity}
    if(character==='char18'){ball.nextPowerAt=state.time+10;ball.kiritoActiveUntil=0}
    if(character==='char19'){ball.nextPowerAt=state.time+10;ball.geassAuraUntil=0}
    if(character==='char20'){ball.nextPowerAt=state.time+8;ball.saitamaState='idle';ball.saitamaChargeUntil=0;ball.saitamaPunchFxUntil=0;ball.saitamaPunchAngle=angle;ball.saitamaRangeMultiplier=1}
    if(character==='char29')ball.nextPowerAt=state.time+11;
    if(character==='char1'){ball.nextPowerAt=Infinity;ball.zenitsuReadyAt=state.time+5;ball.zenitsuTrailUntil=0;ball.zenitsuOldX=ball.x;ball.zenitsuOldY=ball.y;ball.zenitsuSeed=Math.random()*1000}
    if(character==='char2'){ball.nextPowerAt=state.time+9.6;ball.meguminState='idle';ball.meguminExhaustedUntil=0;ball.meguminHasCast=false}
    if(character==='char3')ball.nextPowerAt=state.time+3;
    if(character==='char4'){ball.nextPowerAt=Infinity;ball.thorfinnNextPhaseAt=state.time+7;ball.thorfinnPhaseUntil=0;ball.thorfinnAudioStopsAt=Infinity;ball.thorfinnNextPointAt=state.time+1;ball.thorfinnPassiveTicks=0;ball.thorfinnFinalWinAt=Infinity;ball.thorfinnFinalLastSecond=-1}
    if(character==='char5'){ball.nextPowerAt=Infinity;ball.singedPoisonUntil=Infinity;ball.singedNextCloudAt=state.time;ball.singedNextSoundAt=state.time+2}
    if(character==='char6'){ball.nextPowerAt=Infinity;ball.subaruHistory=[];ball.subaruNextSnapshotAt=state.time;ball.subaruReturnReady=true;ball.subaruReturnReadyAt=0;ball.subaruInvulnerableUntil=0}
    if(character==='char7'){ball.nextPowerAt=state.time+7;ball.genosState='idle';ball.genosDashUntil=0;ball.genosOverheatedUntil=0;ball.genosSelfDestructing=false;ball.genosSelfDestructAt=0;ball.genosDeathKiller=null}
    if(character==='char8'){ball.nextPowerAt=state.time+7;ball.sungStepUntil=0;ball.sungOldX=ball.x;ball.sungOldY=ball.y}
    if(character==='char9'){ball.nextPowerAt=state.time+7;ball.tanjiroWheelUntil=0;ball.tanjiroTrailUntil=0;ball.tanjiroTrail=[];ball.tanjiroWheelHit=false;ball.tanjiroCurveSign=1;ball.tanjiroGuided=false;ball.tanjiroNextGuided=false;ball.tanjiroTargetId=null}
    if(character==='char10'){ball.nextPowerAt=Infinity;ball.itadoriCombo=0;ball.itadoriFlashUntil=0}
    if(character==='char31')ball.nextPowerAt=state.time+7.5;
    if(character==='char32')ball.nextPowerAt=state.time+7.8;
    if(character==='char33'){ball.nextPowerAt=state.time+4.5;ball.minatoSequenceAt=Infinity;ball.minatoSequenceStep=0;ball.minatoSequenceHitIds=new Set();ball.minatoDashSoundPending=false}
    if(character==='char34'){ball.nextPowerAt=state.time+1.5;ball.cainElementIndex=0;ball.cainReleaseAt=Infinity}
    if(character==='char35'){ball.nextPowerAt=state.time+4;ball.metalBatSwingStartedAt=-Infinity;ball.metalBatSwingUntil=-Infinity;ball.metalBatSwingStartAngle=angle;ball.metalBatSwingHitIds=new Set();ball.metalBatSwingDamage=0}
    if(character==='char22'){const first=POWER_BALANCE.char22?.first??10;ball.luffyArmActive=[false,false];ball.luffyArmReadyAt=[state.time+first,state.time+first]}
    if(character==='char23')ball.denjiNextSoundAt=state.time
    if(character==='char26'){ball.nextPowerAt=state.time+(POWER_BALANCE.char26?.first??10);ball.pikachuCharging=false;ball.pikachuStormReleaseAt=Infinity}
    if(POWER_BALANCE[character]?.first&&character!=='char22'&&character!=='char24'&&character!=='char26')ball.nextPowerAt=state.time+videoCharacterCooldown(ball,POWER_BALANCE[character].first);
    if(character==='char12')ball.nextPowerAt=state.time+videoCharacterCooldown(ball,3.5);
    if(character==='char24')ball.nextErenFormAt=state.time+(POWER_BALANCE.char24?.first??10);
    state.balls.push(ball);if(character==='char27')spawnAlCompanion(ball);createBurst(ball.x,ball.y,color,28);syncUi();
  }

  function enqueuePlayer(nick,character,tier,avatarUrl='',isBot=false) {
    const number=Number(character.slice(4));state.queue.push({nick,character,tier,avatarUrl,isBot,color:character==='char2'?'#e43f45':character==='char3'?'#c82845':character==='char4'?'#94c96b':character==='char5'?'#53c957':character==='char6'?'#8e4fc5':character==='char7'?'#f08a32':character==='char8'?'#4b74e4':character==='char9'?'#31bfcf':character==='char10'?'#db4059':character==='char11'?'#f5a623':character==='char12'?'#eb65a8':character==='char13'?'#68dff7':character==='char14'?'#55bfff':character==='char15'?'#397dff':character==='char16'?'#2bdd9e':character==='char17'?'#87c943':character==='char21'?'#ff344f':character==='char22'?'#ffb23f':character==='char23'?'#aeb6c2':character==='char24'?'#5fe594':character==='char25'?'#38bff8':character==='char26'?'#ffe342':character==='char27'?'#d8b34b':character==='char28'?'#65d9ff':character==='char29'?'#ffb52f':character==='char30'?'#a973ff':character==='char31'?'#749d55':character==='char32'?'#f08a32':character==='char33'?'#ffd94a':character==='char34'?'#8d72ff':character==='char35'?'#c43e35':palette[(number-1)%palette.length]});syncUi();
  }

  function pauseCharacterAudioForLiveEntry() {
    const playing=new Set();for(const audios of activeCharacterAudio.values())for(const audio of audios)if(!audio.paused&&!audio.ended)playing.add(audio);for(const audio of playing){audio.pause();releaseAudioDuck(audio)}pausedLiveCharacterAudio.push(...playing);
  }

  function resumeCharacterAudioAfterLiveEntry() {
    const paused=[...new Set(pausedLiveCharacterAudio)];pausedLiveCharacterAudio=[];for(const audio of paused){const stillActive=[...activeCharacterAudio.values()].some(audios=>audios.has(audio));if(!stillActive||audio.ended||!audio.src)continue;audio.addEventListener('playing',()=>beginAudioDuck(audio),{once:true});audio.play().catch(()=>releaseAudioDuck(audio))}
  }

  function cancelLiveEntryPresentation(resumePowerAudio=true) {
    liveEntryPresentationRun+=1;if(liveEntryPresentationTimer){clearTimeout(liveEntryPresentationTimer);liveEntryPresentationTimer=0}liveEntryInProgress=false;liveEntryCurrent=null;videoEntryReveal.hidden=true;if(resumePowerAudio)resumeCharacterAudioAfterLiveEntry();else pausedLiveCharacterAudio=[];
  }

  function startLiveArenaEntry(entry,onComplete,resumeWhenDone=state.running) {
    if(state.viewMode!=='live'){spawnBall(entry.nick,entry.character,entry.tier,entry.avatarUrl||'',entry.isBot===true);onComplete?.();return}
    if(liveEntryInProgress){state.queue.unshift(entry);syncUi();return}
    const run=++liveEntryPresentationRun,audio=prepareEntryVoice(entry.character);liveEntryInProgress=true;liveEntryCurrent=entry;state.running=false;state.spinning=true;setButtonsDisabled(true);pauseCharacterAudioForLiveEntry();
    const entryDuration=playEntryVoice(entry.character,audio);showVideoEntryReveal(entry.character,`@${entry.nick}`,entry.avatarUrl||'',audio,entryDuration);
    let completed=false;
    const finish=()=>{
      if(completed||run!==liveEntryPresentationRun)return;completed=true;if(liveEntryPresentationTimer){clearTimeout(liveEntryPresentationTimer);liveEntryPresentationTimer=0}stopEntryVoice();liveEntryInProgress=false;liveEntryCurrent=null;
      if(state.viewMode!=='live'){resumeCharacterAudioAfterLiveEntry();state.spinning=false;setButtonsDisabled(false);onComplete?.();return}
      if(playerBallCount()<MAX_BALLS)spawnBall(entry.nick,entry.character,entry.tier,entry.avatarUrl||'',entry.isBot===true);else state.queue.unshift(entry);
      onComplete?.();
      if(playerBallCount()<MAX_BALLS&&state.queue.length){const next=state.queue.shift();startLiveArenaEntry(next,null,resumeWhenDone);return}
      resumeCharacterAudioAfterLiveEntry();state.running=resumeWhenDone;state.lastTime=performance.now();state.spinning=false;setButtonsDisabled(false);syncUi();
    };
    audio.addEventListener('ended',()=>setTimeout(finish,220),{once:true});audio.addEventListener('error',finish,{once:true});liveEntryPresentationTimer=setTimeout(finish,Math.max(2600,Math.min(8000,entryDuration+650)));
  }

  const liveQueueDemoNames=['tiktok','netflix','crunchyroll','marvel','nasa','nba','spotify','duolingo','primevideo','disneyplus','espn','fifa'];
  const liveQueueDemoTiers=['small','medium','small','large','small','medium','large','small'];
  function scheduleNextLiveDemoDonation(delay=850){
    clearTimeout(liveQueueSimulationTimer);liveQueueSimulationTimer=0;if(!liveQueueSimulationRunning)return;
    liveQueueSimulationTimer=setTimeout(addLiveQueueDemoDonation,delay);
  }
  function waitForLiveDemoDonation(){
    clearTimeout(liveQueueSimulationTimer);liveQueueSimulationTimer=0;if(!liveQueueSimulationRunning)return;
    if(state.spinning){liveQueueSimulationTimer=setTimeout(waitForLiveDemoDonation,180);return}
    scheduleNextLiveDemoDonation();
  }
  function addLiveQueueDemoDonation(){
    liveQueueSimulationTimer=0;if(!liveQueueSimulationRunning)return;if(state.spinning){scheduleNextLiveDemoDonation(180);return}
    const index=liveQueueSimulationIndex++,activePlayers=state.balls.filter(ball=>!ball.dead&&!ball.isClone),repeatDonation=index>=7&&index%6===5&&activePlayers.length;
    const baseName=liveQueueDemoNames[index%liveQueueDemoNames.length],round=Math.floor(index/liveQueueDemoNames.length),nick=repeatDonation?activePlayers[index%activePlayers.length].nick:round?`${baseName}${round+1}`:baseName,tier=liveQueueDemoTiers[index%liveQueueDemoTiers.length];
    const avatarUrl=generatedLiveAvatar(nick),demoDonation={kind:'entry',trigger:'simulation',username:nick,avatarUrl};demoDonation.avatarReady=preloadImageUrl(avatarUrl).then(()=>avatarUrl);
    ui.viewer.value=nick;runRoulette(tier,demoDonation);waitForLiveDemoDonation();
  }
  function setLiveQueueSimulation(running){
    liveQueueSimulationRunning=running;if(liveQueueSimulationTimer){clearTimeout(liveQueueSimulationTimer);liveQueueSimulationTimer=0}
    liveQueueSimulation.classList.toggle('is-running',running);liveQueueSimulation.setAttribute('aria-pressed',String(running));liveQueueSimulation.innerHTML=running?'<span aria-hidden="true">Ⅱ</span><b>PAUSAR LIVE</b>':'<span aria-hidden="true">▶</span><b>SIMULAR LIVE</b>';
    if(running)addLiveQueueDemoDonation();
  }

  function setLiveBridgeStatus(connected,message='') {
    if(!liveBridgeMonitor)return;
    liveBridgeMonitor.classList.toggle('is-connected',connected);
    liveBridgeMonitor.classList.toggle('is-offline',!connected);
    liveBridgeDot.classList.toggle('is-connected',connected);
    liveBridgeStatus.textContent=connected?'PONTE CONECTADA':'PONTE OFFLINE';
    if(message)liveBridgeEvent.textContent=message;
  }

  function queueLiveDonation(event) {
    if(!event||!['small','medium','large'].includes(event.tier))return;
    if(event.id&&seenLiveDonationIds.has(event.id))return;
    if(event.id){seenLiveDonationIds.add(event.id);if(seenLiveDonationIds.size>200)seenLiveDonationIds.delete(seenLiveDonationIds.values().next().value)}
    const username=sanitizeName(event.username||event.nickname)||'jogador';
    const donation={...event,username,avatarUrl:event.avatarUrl||`https://unavatar.io/tiktok/${encodeURIComponent(username)}`};
    if(donation.kind==='entry'&&!donation.isBot)donation.avatarReady=requestLiveDonationAvatar(username,event.avatarUrl||'').then(avatarUrl=>{donation.avatarUrl=avatarUrl;return avatarUrl});
    if(donation.kind==='entry'&&donation.trigger==='comment'){
      const alreadyActive=state.balls.some(ball=>!ball.dead&&!ball.isClone&&ball.nick.toLowerCase()===username.toLowerCase()),alreadyQueued=state.queue.some(player=>player.nick.toLowerCase()===username.toLowerCase()),alreadyPending=pendingLiveDonations.some(item=>item.kind==='entry'&&item.username.toLowerCase()===username.toLowerCase()),currentlyEntering=activeLiveDonation?.username?.toLowerCase()===username.toLowerCase();
      if(alreadyActive||alreadyQueued||alreadyPending||currentlyEntering){liveBridgeEvent.textContent=`@${username} já está participando`;return}
    }
    pendingLiveDonations.push(donation);
    const description=donation.kind==='heal'?'+10 HP por 50 curtidas':donation.kind==='arena-clear'?'ATIVOU A EXPLOSÃO':donation.trigger==='comment'?'comentou EU':`${tierConfig[event.tier].shortLabel}${event.giftName?` • ${event.giftName}`:''}`;
    liveBridgeEvent.textContent=`@${username} • ${description}`;
    drainLiveDonations();
  }

  function drainLiveDonations() {
    if(state.viewMode!=='live'||state.spinning||liveEntryInProgress||!pendingLiveDonations.length)return;
    const donation=pendingLiveDonations.shift();
    if(donation.kind==='arena-clear'){triggerArenaExplosion(donation);return}
    const activeBall=state.balls.find(ball=>!ball.dead&&!ball.isClone&&ball.nick.toLowerCase()===donation.username.toLowerCase());
    if(donation.kind==='heal'){
      if(!activeBall){liveBridgeEvent.textContent=`@${donation.username} ainda não está na arena`;setTimeout(drainLiveDonations,0);return}
      const healKey=donation.username.toLowerCase(),now=Date.now(),readyAt=liveLikeHealReadyAt.get(healKey)||0;
      if(now<readyAt){liveBridgeEvent.textContent=`@${donation.username} • cura em ${Math.ceil((readyAt-now)/1000)}s`;setTimeout(drainLiveDonations,0);return}
      liveLikeHealReadyAt.set(healKey,now+LIVE_LIKE_HEAL_COOLDOWN_MS);
      activeLiveDonation=donation;healBall(activeBall,'small',donation);return
    }
    if(donation.trigger==='comment'&&(activeBall||state.queue.some(player=>player.nick.toLowerCase()===donation.username.toLowerCase()))){liveBridgeEvent.textContent=`@${donation.username} já está participando`;setTimeout(drainLiveDonations,0);return}
    ui.viewer.value=donation.username;
    runRoulette(donation.tier,donation);
  }

  function triggerArenaExplosion(interaction) {
    const username=interaction.username||'jogador',centerX=state.width/2,centerY=state.height/2;
    state.spinning=true;setButtonsDisabled(true);liveArenaExplosionUser.textContent=`@${username} limpou a arena`;
    liveArenaExplosion.hidden=false;liveArenaExplosion.classList.remove('is-active');void liveArenaExplosion.offsetWidth;liveArenaExplosion.classList.add('is-active');
    createBurst(centerX,centerY,'#fff1a6',90);createBurst(centerX,centerY,'#ff8a32',85);createBurst(centerX,centerY,'#ff315f',70);
    state.floaters.push({x:centerX,y:centerY-state.height*.12,color:'#ffe783',text:'💥 EXPLOSÃO DA ARENA',life:1.35,maxLife:1.35});
    setTimeout(()=>{
      const removed=[...state.balls];
      for(const ball of removed){stopCharacterAudio(ball);if(!ball.isClone&&ball.profile){ball.profile.active=false;ball.profile.eliminatedAt=state.time}createBurst(ball.x,ball.y,ball.color,22)}
      state.balls=[];state.companions=[];state.projectiles=[];state.contactCooldowns.clear();liveNoHumanSince=Date.now();liveNextBotAt=liveNoHumanSince+LIVE_BOT_IDLE_MS;syncUi();
    },620);
    setTimeout(()=>{
      liveArenaExplosion.hidden=true;liveArenaExplosion.classList.remove('is-active');state.spinning=false;setButtonsDisabled(false);
      if(state.queue.length){const next=state.queue.shift();startLiveArenaEntry(next)}else drainLiveDonations();
    },1550);
  }

  function updateLiveBots() {
    const now=Date.now();
    if(state.viewMode!=='live') { liveNoHumanSince=0;liveNextBotAt=0;botSpawnCountdown.hidden=true;return }
    if(now<liveBotSpawnFlashUntil){botSpawnCountdown.hidden=false;botSpawnCountdown.className='bot-spawn-countdown is-spawn';botSpawnCountdownValue.textContent='SPAWN!!';return}
    if(state.spinning||liveEntryInProgress||!liveRoulette.hidden){liveNoHumanSince=0;liveNextBotAt=0;botSpawnCountdown.hidden=true;return}
    const activeEntities=state.balls.filter(ball=>!ball.dead&&!ball.isClone),humanEntering=pendingLiveDonations.some(entry=>entry.kind==='entry'&&!entry.isBot)||(activeLiveDonation?.kind==='entry'&&!activeLiveDonation?.isBot)||(liveEntryCurrent&&!liveEntryCurrent.isBot);
    if(activeEntities.length>=3){liveNoHumanSince=0;liveNextBotAt=0;botSpawnCountdown.hidden=true;return}
    if(humanEntering){liveNoHumanSince=0;liveNextBotAt=0;botSpawnCountdown.hidden=true;return}
    if(!liveNoHumanSince){liveNoHumanSince=now;liveNextBotAt=now+LIVE_BOT_IDLE_MS}
    const seconds=Math.max(1,Math.ceil((liveNextBotAt-now)/1000));botSpawnCountdown.hidden=false;botSpawnCountdown.className=`bot-spawn-countdown ${seconds>=7?'is-blue':seconds>=4?'is-yellow':'is-red'}`;botSpawnCountdownValue.textContent=String(seconds);
    const bots=activeEntities.filter(ball=>ball.isBot);
    if(bots.length>=3||now<liveNextBotAt)return;
    const activeNames=new Set(bots.map(ball=>ball.nick.toLowerCase())),botNumber=[1,2,3].find(number=>!activeNames.has(`bot_${number}`));
    if(!botNumber)return;
    const nick=`bot_${botNumber}`,botEntry={kind:'bot',trigger:'system',tier:'small',username:nick,nickname:nick,avatarUrl:'',isBot:true,source:'system'};liveNoHumanSince=0;liveNextBotAt=0;liveBotSpawnFlashUntil=now+900;botSpawnCountdown.className='bot-spawn-countdown is-spawn';botSpawnCountdownValue.textContent='SPAWN!!';state.spinning=true;setButtonsDisabled(true);
    setTimeout(()=>{state.spinning=false;setButtonsDisabled(false);ui.viewer.value=nick;runRoulette('small',botEntry)},900);
  }

  function connectLiveBridge() {
    const localBridgeHost=['127.0.0.1','localhost'].includes(location.hostname)||location.hostname.startsWith('port8832-');
    if(!localBridgeHost||!window.EventSource){
      setLiveBridgeStatus(false,'Abra pelo iniciar-live.bat');
      return;
    }
    if(liveBridgeSource)liveBridgeSource.close();
    clearTimeout(liveBridgeRetryTimer);
    const source=new EventSource('/api/live/events');liveBridgeSource=source;
    source.addEventListener('bridge',()=>setLiveBridgeStatus(true,'Aguardando presente do TikTok'));
    source.addEventListener('live-interaction',(message)=>{
      setLiveBridgeStatus(true);
      try{queueLiveDonation(JSON.parse(message.data))}catch{liveBridgeEvent.textContent='Evento inválido recebido'}
    });
    source.onerror=()=>{
      setLiveBridgeStatus(false,'Tentando reconectar...');
      if(source.readyState===EventSource.CLOSED){source.close();liveBridgeRetryTimer=setTimeout(connectLiveBridge,1500)}
    };
  }

  async function simulateBridgeDonation(actionId) {
    const button=liveBridgeTestButtons.find(item=>item.dataset.liveTestAction===actionId);if(button)button.disabled=true;
    try{
      const existing=state.balls.find(ball=>!ball.dead&&!ball.isClone),username=actionId==='likes_heal_50'&&existing?existing.nick:`teste_${Math.floor(100+Math.random()*900)}`;
      const response=await fetch('/api/live/test',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({actionId,username})});
      if(!response.ok)throw new Error('bridge-test');
    }catch{setLiveBridgeStatus(false,'Falha ao simular • reinicie a ponte')}finally{if(button)button.disabled=false}
  }

  function promoteNextPlayer() {
    if(playerBallCount()>=MAX_BALLS||!state.queue.length||liveEntryInProgress)return;
    const next=state.queue.shift();if(state.viewMode==='live')startLiveArenaEntry(next);else spawnBall(next.nick,next.character,next.tier,next.avatarUrl||'');
  }

  function removeOldestBall() {
    const leavingIndex=state.balls.findIndex(ball=>!ball.isClone);if(leavingIndex<0){ui.error.textContent='Não há nenhuma bolinha para retirar.';return}
    const leaving=state.balls[leavingIndex],removed=state.balls.filter(ball=>ball===leaving||sameCloneFamily(ball,leaving));state.balls=state.balls.filter(ball=>!removed.includes(ball));state.companions=state.companions.filter(companion=>!removed.includes(companion.owner));leaving.profile.active=false;state.projectiles=state.projectiles.filter(projectile=>!removed.includes(projectile.owner));for(const ball of removed){stopCharacterAudio(ball);createBurst(ball.x,ball.y,ball.color,ball.isClone?14:28)}syncUi();promoteNextPlayer();
  }

  function createBurst(x,y,color,count=12){for(let i=0;i<count;i++){const a=Math.random()*Math.PI*2,s=35+Math.random()*130;state.particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:.3+Math.random()*.45,maxLife:.75,color,size:1+Math.random()*3})}}

  function keepConstantSpeed(ball,targetSpeed=ball.moveSpeed) {
    const currentSpeed=Math.hypot(ball.vx,ball.vy);
    if(currentSpeed<.001){
      const fallbackAngle=Math.random()*Math.PI*2;
      ball.vx=Math.cos(fallbackAngle)*targetSpeed;
      ball.vy=Math.sin(fallbackAngle)*targetSpeed;
      return;
    }
    const correction=targetSpeed/currentSpeed;
    ball.vx*=correction;
    ball.vy*=correction;
  }

  function startMidoriyaCharge(midoriya) {
    midoriya.midoriyaState='charging';midoriya.midoriyaChargeUntil=state.time+3;midoriya.nextPowerAt=Infinity;midoriya.vx=0;midoriya.vy=0;
    playCharacterCue('char16','power',{volume:.38,owner:midoriya});
    createBurst(midoriya.x,midoriya.y,'#62f5ba',22);state.floaters.push({x:midoriya.x,y:midoriya.y-midoriya.radius-9,color:'#8affd7',text:'CARREGANDO...',life:3,maxLife:3});
  }

  function launchMidoriyaDash(midoriya) {
    const target=nearestEnemy(midoriya);if(!target){midoriya.midoriyaState='idle';midoriya.nextPowerAt=state.time+1;keepConstantSpeed(midoriya);return}
    const angle=Math.atan2(target.y-midoriya.y,target.x-midoriya.x);midoriya.midoriyaState='dashing';midoriya.midoriyaDashUntil=state.time+1.8;midoriya.vx=Math.cos(angle)*midoriya.moveSpeed*3;midoriya.vy=Math.sin(angle)*midoriya.moveSpeed*3;
    createBurst(midoriya.x,midoriya.y,'#ff814d',34);state.floaters.push({x:midoriya.x,y:midoriya.y-midoriya.radius-9,color:'#7dffd1',text:'ONE FOR ALL!',life:1,maxLife:1});
  }

  function finishMidoriyaDash(midoriya) {
    midoriya.midoriyaState='idle';midoriya.nextPowerAt=state.time+9;keepConstantSpeed(midoriya,midoriya.moveSpeed);
  }

  function kiritoDualBladesActive(ball) { return ball.character==='char18'&&state.time<(ball.kiritoActiveUntil||0); }
  function thorfinnPhased(ball) { return ball.character==='char4'&&state.time<(ball.thorfinnPhaseUntil||0); }
  function subaruIntangible(ball) { return ball.character==='char6'&&state.time<(ball.subaruInvulnerableUntil||0); }
  function genosCritical(ball) { return ball.character==='char7'&&ball.genosSelfDestructing; }

  function activateKiritoDualBlades(kirito) {
    playCharacterCue('char18','power',{volume:.72,owner:kirito});
    kirito.kiritoActiveUntil=state.time+4;kirito.nextPowerAt=state.time+10;
    createBurst(kirito.x,kirito.y,'#70e8ff',34);
    state.floaters.push({x:kirito.x,y:kirito.y-kirito.radius-10,color:'#a9f5ff',text:'DUAL BLADES • 200%',life:1.2,maxLife:1.2});
  }

  function landKiritoSlash(kirito,target) {
    const cooldownKey=`kirito:${kirito.id}:${target.id}`;if((state.contactCooldowns.get(cooldownKey)||0)>state.time)return;
    const dx=target.x-kirito.x,dy=target.y-kirito.y,distance=Math.hypot(dx,dy)||1,nx=dx/distance,ny=dy/distance,relative=Math.abs((target.vx-kirito.vx)*nx+(target.vy-kirito.vy)*ny),impactRatio=Math.min(1,relative/(kirito.moveSpeed+target.moveSpeed)),avoidedCollisionDamage=Math.round(3+impactRatio*13)*videoCollisionDamageMultiplier();applyProjectileDamage(target,kirito,9);if(!kirito.dead&&!target.dead)applyProjectileDamage(kirito,target,avoidedCollisionDamage*.1);target.kiritoSlashUntil=state.time+.78;target.kiritoSlashSeed=Math.random()*Math.PI*2;
    state.contactCooldowns.set(cooldownKey,state.time+.9);createBurst(target.x,target.y,'#9befff',18);
    state.floaters.push({x:target.x,y:target.y-target.radius-8,color:'#d9fbff',text:'MULTI CORTE!',life:.72,maxLife:.72});
  }

  function activateLelouchGeass(lelouch) {
    const enemies=state.balls.filter(ball=>ball!==lelouch&&!ball.dead&&!sameCloneFamily(ball,lelouch));if(!enemies.length){lelouch.nextPowerAt=state.time+1;return}
    const durationScale=balancedCooldown('char19',10)/10;lelouch.geassAuraUntil=state.time+1.25*durationScale;lelouch.nextPowerAt=state.time+balancedCooldown('char19',10);playCharacterCue('char19','power',{volume:.78,owner:lelouch});createBurst(lelouch.x,lelouch.y,'#ff3268',32);
    if(enemies.length===1){const target=enemies[0];target.geassRushUntil=0;target.geassStopUntil=state.time+3.5*durationScale;target.geassEffectUntil=state.time+3.5*durationScale;target.geassEffectMode='stop';target.vx=0;target.vy=0;applyProjectileDamage(target,lelouch,balancedDamage('char19',5));createBurst(target.x,target.y,'#ff477c',24);state.floaters.push({x:target.x,y:target.y-target.radius-9,color:'#ff86a7',text:'GEASS • PARE!',life:1.1,maxLife:1.1});return}
    let nearest=null,farthest=null,nearestDistance=Infinity,farthestDistance=-1;for(const enemy of enemies){const distance=(enemy.x-lelouch.x)**2+(enemy.y-lelouch.y)**2;if(distance<nearestDistance){nearestDistance=distance;nearest=enemy}if(distance>farthestDistance){farthestDistance=distance;farthest=enemy}}
    if(farthest===nearest)farthest=enemies.find(enemy=>enemy!==nearest)||farthest;const dx=farthest.x-nearest.x,dy=farthest.y-nearest.y,distance=Math.hypot(dx,dy)||1;nearest.geassStopUntil=0;nearest.geassRushUntil=state.time+1.5*durationScale;nearest.geassEffectUntil=state.time+1.5*durationScale;nearest.geassEffectMode='rush';if(nearest.character==='char16')nearest.midoriyaState='idle';nearest.vx=dx/distance*nearest.moveSpeed*8;nearest.vy=dy/distance*nearest.moveSpeed*8;
    createBurst(nearest.x,nearest.y,'#ff477c',28);state.floaters.push({x:nearest.x,y:nearest.y-nearest.radius-9,color:'#ff86a7',text:'GEASS • ATAQUE!',life:1.1,maxLife:1.1});
  }

  function activateSaitamaPunch(saitama) {
    saitama.saitamaState='charging';saitama.saitamaChargeUntil=state.time+.55;saitama.nextPowerAt=state.time+videoCharacterCooldown(saitama,balancedCooldown('char20',8));saitama.saitamaPunchAngle=Math.atan2(saitama.vy,saitama.vx);saitama.vx=0;saitama.vy=0;
    playCharacterCue('char20','power',{volume:.78,owner:saitama});
    createBurst(saitama.x,saitama.y,'#ffd86b',24);state.floaters.push({x:saitama.x,y:saitama.y-saitama.radius-9,color:'#ffe89d',text:'...',life:.55,maxLife:.55});
  }

  function releaseSaitamaPunch(saitama) {
    const enemies=state.balls.filter(enemy=>enemy!==saitama&&!enemy.dead&&!sameCloneFamily(enemy,saitama)),baseRange=Math.max(105,state.width*.16),range=baseRange*(saitama.saitamaRangeMultiplier||1);let target=null,nearestDistance=Infinity;for(const enemy of enemies){const distance=Math.hypot(enemy.x-saitama.x,enemy.y-saitama.y);if(distance<=range+enemy.radius&&distance<nearestDistance){nearestDistance=distance;target=enemy}}
    let angle=saitama.saitamaPunchAngle;if(target)angle=Math.atan2(target.y-saitama.y,target.x-saitama.x);saitama.saitamaPunchAngle=angle;saitama.saitamaPunchFxUntil=state.time+.58;saitama.saitamaState='idle';saitama.vx=Math.cos(angle)*saitama.moveSpeed;saitama.vy=Math.sin(angle)*saitama.moveSpeed;
    if(!target){if(enemies.length)saitama.saitamaRangeMultiplier=(saitama.saitamaRangeMultiplier||1)+.25;createBurst(saitama.x+Math.cos(angle)*saitama.radius*1.6,saitama.y+Math.sin(angle)*saitama.radius*1.6,'#ffffff',18);state.floaters.push({x:saitama.x,y:saitama.y-saitama.radius-8,color:enemies.length?'#ffe08b':'#b9bfd0',text:enemies.length?`ALCANCE +${Math.round(((saitama.saitamaRangeMultiplier||1)-1)*100)}%`:'SOCO NO AR',life:.8,maxLife:.8});return}
    saitama.saitamaRangeMultiplier=1;
    applyProjectileDamage(target,saitama,balancedDamage('char20',32));const nx=Math.cos(angle),ny=Math.sin(angle);target.vx=nx*target.moveSpeed*2;target.vy=ny*target.moveSpeed*2;target.knockbackUntil=state.time+.9;target.saitamaHitUntil=state.time+.58;target.saitamaHitAngle=angle;
    createBurst(target.x,target.y,'#ff5b45',58);state.floaters.push({x:target.x,y:target.y-target.radius-11,color:'#fff0b8',text:'SOCO!',life:1,maxLife:1});
  }

  function zenitsuOppositeDestination(zenitsu) {
    const bounds=arenaBounds(),centerX=(bounds.left+bounds.right)/2,centerY=(bounds.top+bounds.bottom)/2,margin=zenitsu.radius+10;let dx=zenitsu.x-centerX,dy=zenitsu.y-centerY,distance=Math.hypot(dx,dy);if(distance<20){dx=-zenitsu.vx;dy=-zenitsu.vy;distance=Math.hypot(dx,dy)||1}const directionX=-dx/distance,directionY=-dy/distance;
    const minX=bounds.left+margin,maxX=bounds.right-margin,minY=bounds.top+margin,maxY=bounds.bottom-margin,horizontalLimit=Math.abs(directionX)<.001?Infinity:(directionX>0?(maxX-centerX)/directionX:(minX-centerX)/directionX),verticalLimit=Math.abs(directionY)<.001?Infinity:(directionY>0?(maxY-centerY)/directionY:(minY-centerY)/directionY),travel=Math.max(0,Math.min(horizontalLimit,verticalLimit));const baseX=centerX+directionX*travel,baseY=centerY+directionY*travel;
    const isFree=(x,y)=>state.balls.every(other=>other===zenitsu||other.dead||Math.hypot(other.x-x,other.y-y)>=other.radius+zenitsu.radius+9);for(let ring=0;ring<6;ring++){const radius=ring*20,points=ring?12:1;for(let point=0;point<points;point++){const angle=point*Math.PI*2/points+zenitsu.zenitsuSeed,x=Math.max(minX,Math.min(maxX,baseX+Math.cos(angle)*radius)),y=Math.max(minY,Math.min(maxY,baseY+Math.sin(angle)*radius));if(isFree(x,y))return{x,y}}}return{x:baseX,y:baseY};
  }

  function releaseZenitsuTeleport(zenitsu) {
    const oldX=zenitsu.x,oldY=zenitsu.y,destination=zenitsuOppositeDestination(zenitsu),dx=destination.x-oldX,dy=destination.y-oldY,distance=Math.hypot(dx,dy)||1;zenitsu.zenitsuOldX=oldX;zenitsu.zenitsuOldY=oldY;playCharacterCue('char1','power',{volume:.86,owner:zenitsu});for(const target of state.balls){if(target===zenitsu||target.dead||sameCloneFamily(target,zenitsu))continue;if(pointSegmentDistance(target.x,target.y,oldX,oldY,destination.x,destination.y)<=target.radius+12){applyProjectileDamage(target,zenitsu,26);createBurst(target.x,target.y,'#ffe75b',16)}}zenitsu.x=destination.x;zenitsu.y=destination.y;zenitsu.vx=dx/distance*zenitsu.moveSpeed;zenitsu.vy=dy/distance*zenitsu.moveSpeed;zenitsu.zenitsuTrailUntil=state.time+.58;zenitsu.zenitsuReadyAt=state.time+5;zenitsu.zenitsuSeed=Math.random()*1000;
    createBurst(oldX,oldY,'#ffe34d',32);createBurst(zenitsu.x,zenitsu.y,'#ffffff',38);state.floaters.push({x:zenitsu.x,y:zenitsu.y-zenitsu.radius-9,color:'#ffe96b',text:'HEKIREKI ISSEN!',life:1,maxLife:1});
  }

  function castMeguminExplosion(megumin) {
    const target=nearestEnemy(megumin),blastRadius=Math.max(190,state.width*.36),margin=blastRadius*.35;
    const targetX=target?Math.max(margin,Math.min(state.width-margin,target.x)):state.width/2,targetY=target?Math.max(margin,Math.min(state.height-margin,target.y)):state.height/2;
    megumin.meguminState='charging';megumin.meguminHasCast=true;megumin.nextPowerAt=Infinity;megumin.vx=0;megumin.vy=0;playCharacterCue('char2','power',{volume:.86,owner:megumin});
    state.projectiles.push({type:'meguminExplosion',owner:megumin,x:targetX,y:targetY,radius:blastRadius,phase:'charging',chargeLeft:1.2,life:2.35,damage:25.2,rotation:Math.random()*Math.PI*2});
    createBurst(megumin.x,megumin.y,'#ff4d58',28);state.floaters.push({x:megumin.x,y:megumin.y-megumin.radius-10,color:'#ff9878',text:'EXPLOSION...',life:1.2,maxLife:1.2});
  }

  function throwYorKnives(yor) {
    const speed=state.width*.58;
    for(let knife=0;knife<5;knife++){const angle=Math.random()*Math.PI*2;state.projectiles.push({type:'yorKnife',owner:yor,x:yor.x+Math.cos(angle)*(yor.radius+14),y:yor.y+Math.sin(angle)*(yor.radius+14),vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,angle,radius:10,damage:9,life:2.7,knifeSide:knife%2,rotation:Math.random()*Math.PI*2})}
    yor.nextPowerAt=state.time+3;playCharacterCue('char3','power',{volume:.74,owner:yor});createBurst(yor.x,yor.y,'#efc94d',12);
  }

  function startGenosDash(genos) {
    const target=nearestEnemy(genos);if(!target){genos.nextPowerAt=state.time+1;return}const angle=Math.atan2(target.y-genos.y,target.x-genos.x);genos.genosState='dashing';genos.genosDashUntil=state.time+.4;genos.nextPowerAt=Infinity;genos.vx=Math.cos(angle)*genos.moveSpeed*3;genos.vy=Math.sin(angle)*genos.moveSpeed*3;playCharacterCue('char7','power',{volume:.8,owner:genos});createBurst(genos.x,genos.y,'#ff9d45',30);state.floaters.push({x:genos.x,y:genos.y-genos.radius-9,color:'#ffc26f',text:'PROPULSORES • 300%',life:.6,maxLife:.6});
  }

  function fireGenosIncinerator(genos) {
    const angle=Math.atan2(genos.vy,genos.vx),length=state.width*.5,halfAngle=.38;genos.genosState='overheated';genos.genosOverheatedUntil=state.time+3;genos.nextPowerAt=state.time+balancedCooldown('char7',7);state.projectiles.push({type:'genosIncinerator',owner:genos,x:genos.x,y:genos.y,angle,length,halfAngle,life:.72,maxLife:.72});for(const target of state.balls){if(target===genos||target.dead||sameCloneFamily(target,genos)||thorfinnPhased(target)||subaruIntangible(target)||genosCritical(target))continue;const dx=target.x-genos.x,dy=target.y-genos.y,distance=Math.hypot(dx,dy)||1,targetAngle=Math.atan2(dy,dx),difference=Math.abs(Math.atan2(Math.sin(targetAngle-angle),Math.cos(targetAngle-angle))),allowance=Math.asin(Math.min(1,target.radius/distance));if(distance<=length+target.radius&&difference<=halfAngle+allowance){applyProjectileDamage(target,genos,balancedDamage('char7',23));target.knockbackUntil=state.time+.35;createBurst(target.x,target.y,'#ff873b',24)}}createBurst(genos.x,genos.y,'#fff0a3',46);state.floaters.push({x:genos.x,y:genos.y-genos.radius-10,color:'#ffd17d',text:'INCINERAR!',life:1,maxLife:1});
  }

  function startGenosSelfDestruct(genos,killer) {
    if(genos.character!=='char7'||genos.genosSelfDestructing||genos.dead)return false;genos.genosSelfDestructing=true;genos.genosState='selfDestruct';genos.genosSelfDestructAt=state.time+.8;genos.genosDeathKiller=killer;genos.nextPowerAt=Infinity;genos.hp=1;genos.vx=0;genos.vy=0;createBurst(genos.x,genos.y,'#ff5b32',24);state.floaters.push({x:genos.x,y:genos.y-genos.radius-11,color:'#ffb15f',text:'NÚCLEO CRÍTICO!',life:.8,maxLife:.8});return true;
  }

  function finishGenosSelfDestruct(genos) {
    const radius=Math.max(105,state.width*.17),x=genos.x,y=genos.y;for(const target of state.balls){if(target===genos||target.dead||sameCloneFamily(target,genos)||thorfinnPhased(target))continue;if(Math.hypot(target.x-x,target.y-y)<=radius+target.radius)applyProjectileDamage(target,genos,25)}state.projectiles.push({type:'genosExplosion',owner:null,x,y,radius,life:.85,maxLife:.85});createBurst(x,y,'#fff19b',100);createBurst(x,y,'#ff532d',80);genos.genosSelfDestructing=false;recordVideoElimination(genos);genos.dead=true;stopCharacterAudio(genos);genos.profile.active=false;const killer=genos.genosDeathKiller;if(killer){awardKo(killer);if(killer.character==='char8')spawnSungShadow(killer,genos)}renderRanking();
  }

  function updateGenosPowers() {
    for(const genos of state.balls){if(genos.dead||genos.character!=='char7')continue;if(genos.genosSelfDestructing){if(state.time>=genos.genosSelfDestructAt)finishGenosSelfDestruct(genos);continue}if(genos.genosState==='dashing'&&state.time>=genos.genosDashUntil)fireGenosIncinerator(genos);if(genos.genosState==='overheated'&&state.time>=genos.genosOverheatedUntil)genos.genosState='idle'}
  }

  function activateSungShadowStep(sung) {
    const target=nearestEnemy(sung);if(!target){sung.nextPowerAt=state.time+1;return}const oldX=sung.x,oldY=sung.y,targetSpeed=Math.hypot(target.vx,target.vy),behindAngle=targetSpeed>.01?Math.atan2(target.vy,target.vx):Math.random()*Math.PI*2,distance=sung.radius+target.radius+7,destinationX=Math.max(sung.radius,Math.min(state.width-sung.radius,target.x-Math.cos(behindAngle)*distance)),destinationY=Math.max(sung.radius,Math.min(state.height-sung.radius,target.y-Math.sin(behindAngle)*distance)),travelX=destinationX-oldX,travelY=destinationY-oldY,travelDistance=Math.hypot(travelX,travelY)||1;sung.sungOldX=oldX;sung.sungOldY=oldY;sung.x=destinationX;sung.y=destinationY;sung.vx=travelX/travelDistance*sung.moveSpeed;sung.vy=travelY/travelDistance*sung.moveSpeed;sung.sungStepUntil=state.time+.45;sung.nextPowerAt=state.time+balancedCooldown('char8',7);playCharacterCue('char8','power',{volume:.7,owner:sung});applyProjectileDamage(target,sung,balancedDamage('char8',12));target.kiritoSlashUntil=state.time+.72;target.kiritoSlashSeed=Math.random()*Math.PI*2;createBurst(oldX,oldY,'#172350',24);createBurst(sung.x,sung.y,'#609cff',30);state.floaters.push({x:sung.x,y:sung.y-sung.radius-10,color:'#9bc6ff',text:'PASSO DAS SOMBRAS',life:.9,maxLife:.9});
  }

  function activateTanjiroWaterWheel(tanjiro) {
    const target=nearestEnemy(tanjiro);if(!target){tanjiro.nextPowerAt=state.time+1;return}const angle=Math.atan2(target.y-tanjiro.y,target.x-tanjiro.x);tanjiro.tanjiroGuided=tanjiro.tanjiroNextGuided;tanjiro.tanjiroNextGuided=!tanjiro.tanjiroNextGuided;tanjiro.tanjiroTargetId=target.id;tanjiro.tanjiroWheelUntil=state.time+1.55;tanjiro.tanjiroTrailUntil=state.time+2.1;tanjiro.tanjiroTrail=[{x:tanjiro.x,y:tanjiro.y,life:1}];tanjiro.tanjiroNextTrailAt=state.time;tanjiro.tanjiroWheelHit=false;tanjiro.tanjiroWheelActive=true;tanjiro.tanjiroCurveSign=Math.random()<.5?-1:1;tanjiro.nextPowerAt=state.time+balancedCooldown('char9',7);tanjiro.vx=Math.cos(angle)*tanjiro.moveSpeed*3;tanjiro.vy=Math.sin(angle)*tanjiro.moveSpeed*3;playCharacterCue('char9','power',{volume:.8,owner:tanjiro});createBurst(tanjiro.x,tanjiro.y,tanjiro.tanjiroGuided?'#b9ffff':'#6eeeff',32);state.floaters.push({x:tanjiro.x,y:tanjiro.y-tanjiro.radius-10,color:'#a8f8ff',text:tanjiro.tanjiroGuided?'RODA D’ÁGUA • GUIADA!':'RODA D’ÁGUA!',life:1,maxLife:1});
  }

  function updateTanjiroWaterWheel(tanjiro,dt) {
    if(state.time<tanjiro.tanjiroWheelUntil){let turn;if(tanjiro.tanjiroGuided){let target=state.balls.find(candidate=>candidate.id===tanjiro.tanjiroTargetId&&!candidate.dead&&!sameCloneFamily(candidate,tanjiro));if(!target){target=nearestEnemy(tanjiro);tanjiro.tanjiroTargetId=target?.id??null}if(target){const currentAngle=Math.atan2(tanjiro.vy,tanjiro.vx),targetAngle=Math.atan2(target.y-tanjiro.y,target.x-tanjiro.x),difference=Math.atan2(Math.sin(targetAngle-currentAngle),Math.cos(targetAngle-currentAngle));turn=Math.max(-dt*4.2,Math.min(dt*4.2,difference))}else turn=0}else turn=tanjiro.tanjiroCurveSign*dt*1.35;const cos=Math.cos(turn),sin=Math.sin(turn),vx=tanjiro.vx,vy=tanjiro.vy;tanjiro.vx=vx*cos-vy*sin;tanjiro.vy=vx*sin+vy*cos;if(state.time>=tanjiro.tanjiroNextTrailAt){tanjiro.tanjiroTrail.push({x:tanjiro.x,y:tanjiro.y,life:1});if(tanjiro.tanjiroTrail.length>18)tanjiro.tanjiroTrail.shift();tanjiro.tanjiroNextTrailAt=state.time+.045}return}if(tanjiro.tanjiroWheelActive){tanjiro.tanjiroWheelActive=false;tanjiro.tanjiroGuided=false;tanjiro.tanjiroTargetId=null;tanjiro.tanjiroTrailUntil=Math.max(tanjiro.tanjiroTrailUntil,state.time+.48);keepConstantSpeed(tanjiro,tanjiro.moveSpeed)}
  }

  function landTanjiroWaterWheel(tanjiro,target) {
    if(tanjiro.tanjiroWheelHit)return;tanjiro.tanjiroWheelHit=true;tanjiro.tanjiroWheelUntil=state.time;tanjiro.tanjiroWheelActive=false;tanjiro.tanjiroTrailUntil=state.time+.62;applyProjectileDamage(target,tanjiro,balancedDamage('char9',20));const dx=target.x-tanjiro.x,dy=target.y-tanjiro.y,distance=Math.hypot(dx,dy)||1;target.vx=dx/distance*target.moveSpeed*1.7;target.vy=dy/distance*target.moveSpeed*1.7;target.knockbackUntil=state.time+.35;keepConstantSpeed(tanjiro,tanjiro.moveSpeed);createBurst(target.x,target.y,'#7deeff',34);state.floaters.push({x:target.x,y:target.y-target.radius-9,color:'#baf9ff',text:'CORTE D’ÁGUA!',life:.9,maxLife:.9});
  }

  function registerItadoriCollision(itadori,target) {
    if(itadori.character!=='char10'||itadori.dead)return;itadori.itadoriCombo=(itadori.itadoriCombo||0)+1;if(itadori.itadoriCombo<2){state.floaters.push({x:itadori.x,y:itadori.y-itadori.radius-7,color:'#ff9aa8',text:`IMPACTO ${itadori.itadoriCombo}/2`,life:.55,maxLife:.55});return}itadori.itadoriCombo=0;itadori.itadoriFlashUntil=state.time+.68;target.blackFlashUntil=state.time+.68;target.blackFlashSeed=Math.random()*1000;playCharacterCue('char10','power',{volume:.83,owner:itadori});if(!target.dead){applyProjectileDamage(target,itadori,30);const dx=target.x-itadori.x,dy=target.y-itadori.y,distance=Math.hypot(dx,dy)||1;target.vx=dx/distance*target.moveSpeed*2.2;target.vy=dy/distance*target.moveSpeed*2.2;target.knockbackUntil=state.time+.55}createBurst(target.x,target.y,'#ff2348',44);createBurst(target.x,target.y,'#14030a',28);state.floaters.push({x:target.x,y:target.y-target.radius-12,color:'#ff6078',text:'BLACK FLASH!',life:1.05,maxLife:1.05});
  }

  function spawnSungShadow(sung,victim) {
    if(!sung||sung.dead||sung.character!=='char8'||victim.isClone)return;const active=state.companions.filter(companion=>companion.type==='sungShadow'&&companion.owner===sung).sort((a,b)=>a.createdAt-b.createdAt);if(active.length>=MAX_SUNG_SHADOWS){const oldest=active[0],index=state.companions.indexOf(oldest);if(index>=0)state.companions.splice(index,1);createBurst(oldest.x,oldest.y,'#5a52b8',18)}const angle=Math.random()*Math.PI*2,speed=state.width*.24;state.companions.push({id:state.nextId++,type:'sungShadow',owner:sung,x:victim.x,y:victim.y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,moveSpeed:speed,baseMoveSpeed:speed,radius:victim.radius*.74,rotation:0,life:10,maxLife:10,nextHitAt:state.time+.45,createdAt:state.time,copiedCharacter:victim.character,copiedErenForm:victim.erenForm||1});playCharacterCue('char8','arise',{volume:.82,owner:sung});state.sungAriseUntil=state.time+.9;createBurst(victim.x,victim.y,'#6652d9',42);state.floaters.push({x:victim.x,y:victim.y-victim.radius-12,color:'#99b8ff',text:'ARISE',life:1.3,maxLife:1.3});
  }

  function nearestSungShadowTarget(shadow) {
    let target=null,nearestDistance=Infinity;for(const candidate of state.balls){if(candidate===shadow.owner||candidate.dead||sameCloneFamily(candidate,shadow.owner)||thorfinnPhased(candidate)||subaruIntangible(candidate)||genosCritical(candidate))continue;const distance=(candidate.x-shadow.x)**2+(candidate.y-shadow.y)**2;if(distance<nearestDistance){nearestDistance=distance;target=candidate}}return target;
  }

  function updateSingedPowers() {
    for(const singed of state.balls){if(singed.dead||singed.character!=='char5')continue;if(state.time>=(singed.singedNextSoundAt||0)){playCharacterCue('char5','power',{volume:.34,owner:singed});singed.singedNextSoundAt=state.time+14}}
    for(const singed of state.balls){if(singed.dead||singed.character!=='char5'||state.time>=singed.singedPoisonUntil||state.time<singed.singedNextCloudAt)continue;const speed=Math.hypot(singed.vx,singed.vy)||1,offset=singed.radius*.65,x=singed.x-singed.vx/speed*offset,y=singed.y-singed.vy/speed*offset,puffs=Array.from({length:7},(_,index)=>({angle:index*Math.PI*2/7+Math.random()*.45,distance:Math.random()*18,size:.48+Math.random()*.45}));state.projectiles.push({type:'singedPoison',owner:singed,x,y,radius:Math.max(32,state.width*.052),damage:2,life:4.2,maxLife:4.2,rotation:Math.random()*Math.PI*2,puffs});singed.singedNextCloudAt=state.time+.3}
  }

  function updatePoisonedBalls() {
    for(const ball of state.balls){if(ball.dead||state.time>=(ball.poisonedUntil||0)||state.time<(ball.poisonNextDamageAt||Infinity))continue;const source=ball.poisonSource;if(!source||source.dead||!state.balls.includes(source)){ball.poisonedUntil=0;continue}if(!thorfinnPhased(ball)){applyProjectileDamage(ball,source,1.25);createBurst(ball.x,ball.y,'#74ef68',7);state.floaters.push({x:ball.x,y:ball.y-ball.radius-5,color:'#9cff8f',text:'DANO DE VENENO',life:.55,maxLife:.55})}ball.poisonNextDamageAt=state.time+.5}
  }

  function landMidoriyaDash(midoriya,target) {
    const dx=target.x-midoriya.x,dy=target.y-midoriya.y,distance=Math.hypot(dx,dy)||1,nx=dx/distance,ny=dy/distance;
    applyProjectileDamage(target,midoriya,15);target.knockbackUntil=state.time+1.5;target.vx=nx*target.moveSpeed*2;target.vy=ny*target.moveSpeed*2;midoriya.vx=-nx*midoriya.moveSpeed;midoriya.vy=-ny*midoriya.moveSpeed;finishMidoriyaDash(midoriya);
    createBurst(target.x,target.y,'#ff7048',40);state.floaters.push({x:target.x,y:target.y-target.radius-10,color:'#ff9b68',text:'SMASH! • EMPURRÃO',life:1.1,maxLife:1.1});
  }

  function resolveCollision(a,b) {
    if(a.dead||b.dead||sameCloneFamily(a,b)||thorfinnPhased(a)||thorfinnPhased(b)||subaruIntangible(a)||subaruIntangible(b)||genosCritical(a)||genosCritical(b))return;
    const dx=b.x-a.x,dy=b.y-a.y,dist=Math.hypot(dx,dy)||.001,min=a.radius+b.radius;if(dist>=min)return;
    const kiritoA=kiritoDualBladesActive(a),kiritoB=kiritoDualBladesActive(b);if(kiritoA||kiritoB){if(kiritoA)landKiritoSlash(a,b);if(kiritoB&&!b.dead)landKiritoSlash(b,a);return}
    const nx=dx/dist,ny=dy/dist,overlap=min-dist;a.x-=nx*overlap*.5;a.y-=ny*overlap*.5;b.x+=nx*overlap*.5;b.y+=ny*overlap*.5;
    if(a.character==='char9'&&state.time<a.tanjiroWheelUntil&&!a.tanjiroWheelHit){landTanjiroWaterWheel(a,b);return}
    if(b.character==='char9'&&state.time<b.tanjiroWheelUntil&&!b.tanjiroWheelHit){landTanjiroWaterWheel(b,a);return}
    if(a.character==='char16'&&a.midoriyaState==='dashing'){landMidoriyaDash(a,b);return}
    if(b.character==='char16'&&b.midoriyaState==='dashing'){landMidoriyaDash(b,a);return}
    const relative=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
    if(relative<0){
      const impactRatio=Math.min(1,Math.abs(relative)/(a.moveSpeed+b.moveSpeed));
      const impulse=-relative;
      a.vx-=impulse*nx;a.vy-=impulse*ny;b.vx+=impulse*nx;b.vy+=impulse*ny;
      keepConstantSpeed(a);keepConstantSpeed(b);
      createBurst((a.x+b.x)/2,(a.y+b.y)/2,'#ffffff',4);
      const pairKey=a.id<b.id?`${a.id}:${b.id}`:`${b.id}:${a.id}`;
      if(impactRatio>.08&&(state.contactCooldowns.get(pairKey)||0)<=state.time){
        const baseCollisionDamage=Math.round(3+impactRatio*13),collisionDamage=baseCollisionDamage*videoCollisionDamageMultiplier();
        applyCollisionDamage(a,b,collisionDamage);
        registerItadoriCollision(a,b);registerItadoriCollision(b,a);
        state.contactCooldowns.set(pairKey,state.time+.42);
      }
    }
  }

  function addDamageFloater(ball,amount) {
    if(amount<=0){state.floaters.push({x:ball.x,y:ball.y-ball.radius,color:'#ff668f',text:'INFINITO',life:.7,maxLife:.7});createBurst(ball.x,ball.y,'#ff4f78',9);return}
    state.floaters.push({x:ball.x,y:ball.y-ball.radius,color:'#ff789b',text:`-${Math.round(amount*10)/10}`,life:.75,maxLife:.75});
  }

  function gojoModeActive(ball,mode) { return ball.character==='char30'&&ball.gojoMode===mode&&state.time<ball.gojoActiveUntil; }
  function scoringEnabled() { return state.viewMode!=='video'; }
  function awardDamage(owner,amount) { if(!owner||owner.isBot||amount<=0)return;owner.profile.damage+=amount;if(scoringEnabled())owner.profile.score+=amount; }
  function awardKo(owner) { if(!owner||owner.isBot)return;owner.profile.kos+=1;if(scoringEnabled())owner.profile.score+=100; }
  function videoCollisionDamageMultiplier() {
    if(state.viewMode!=='video')return 1;const alive=playerBallCount();return alive>=6?.6:alive===5?.7:alive===4?.8:alive===3?.9:1;
  }
  function adjustedDamage(target,damage) { if(thorfinnPhased(target)||subaruIntangible(target)||genosCritical(target)||gojoModeActive(target,'red'))return 0;if(target.character==='char24'&&target.erenForm===2)damage*=.5;if(target.character==='char14'&&state.time<(target.killuaActiveUntil||0))damage*=target.killuaDamageMultiplier??.5;if(state.time<(target.geassRushUntil||0))damage*=2;damage*=videoCharacterBalance(target)?.damageTaken??1;return damage; }
  function outgoingDamage(source,damage) { if(source.character==='char4')return 0;if(source.isTestDummy)return damage>0?1:0;let result=damage*(tierConfig[source.tier]?.damageMultiplier||1);if(source.character==='char24'&&source.erenForm===2)result*=1.2;if(gojoModeActive(source,'blue'))result*=1.3;result*=liveCharacterBalance(source)?.outgoingDamage??1;return result; }
  function attackCollisionDamageMultiplier(ball) { if(ball.character==='char9'&&state.time<(ball.tanjiroWheelUntil||0))return .4;if(ball.character==='char10'&&((ball.itadoriCombo||0)>=1||state.time<(ball.itadoriFlashUntil||0)))return .4;return 1; }

  function advanceKilluaResistance(killua,damageTaken) {
    if(damageTaken<=0||killua.character!=='char14'||state.time>=(killua.killuaActiveUntil||0))return;killua.killuaComboHits=(killua.killuaComboHits||0)+1;const initial=killua.tier==='video'?.35:.5,minimum=killua.tier==='video'?.15:.2;killua.killuaDamageMultiplier=Math.max(minimum,initial-killua.killuaComboHits*.1);state.floaters.push({x:killua.x,y:killua.y-killua.radius-5,color:'#bff8ff',text:`PRÓX. DANO ${Math.round(killua.killuaDamageMultiplier*100)}%`,life:.62,maxLife:.62});
  }

  function applyCollisionDamage(a,b,damage) {
    const damageToA=Math.min(a.hp,adjustedDamage(a,outgoingDamage(b,damage))*attackCollisionDamageMultiplier(a)),damageToB=Math.min(b.hp,adjustedDamage(b,outgoingDamage(a,damage))*attackCollisionDamageMultiplier(b));
    a.hp-=damageToA;b.hp-=damageToB;
    awardDamage(b,damageToA);awardDamage(a,damageToB);
    if(damageToA>0||thorfinnPhased(a)||gojoModeActive(a,'red'))addDamageFloater(a,damageToA);if(damageToB>0||thorfinnPhased(b)||gojoModeActive(b,'red'))addDamageFloater(b,damageToB);
    createBurst(a.x,a.y,b.color,7);createBurst(b.x,b.y,a.color,7);advanceKilluaResistance(a,damageToA);advanceKilluaResistance(b,damageToB);
    if(a.hp<=0)eliminateBall(a,b);
    if(b.hp<=0)eliminateBall(b,a);
    renderRanking();
  }

  function eliminateBall(ball,killer) {
    if(trySubaruReturn(ball,killer))return;
    if(startGenosSelfDestruct(ball,killer))return;
    if(ball.dead)return;ball.dead=true;stopCharacterAudio(ball);if(!ball.isClone){recordVideoElimination(ball);ball.profile.active=false;for(const clone of state.balls){if(clone.isClone&&sameCloneFamily(clone,ball)){clone.dead=true;stopCharacterAudio(clone)}}}
    if(killer){awardKo(killer);if(killer.character==='char8')spawnSungShadow(killer,ball)}
    createBurst(ball.x,ball.y,ball.color,38);
  }

  function recordVideoElimination(ball) {
    if(state.viewMode!=='video'||!state.videoBattleStarted||ball.isClone||state.videoEliminationOrder.some(entry=>entry.profile===ball.profile))return;
    ball.profile.eliminatedAt=state.time;
    state.videoEliminationOrder.push({profile:ball.profile,character:ball.character,color:ball.color,x:ball.x,y:ball.y});
  }

  function podiumPerson(profile,place,caption) {
    if(!profile)return'';const portrait=roulettePortrait(profile.lastCharacter),medal=place===1?'OURO':place===2?'PRATA':'BRONZE',playerBadge=profile.avatarUrl?`<span class="has-player-avatar" style="background-image:url('${profile.avatarUrl}')" aria-label="Avatar de ${profile.nick}"></span>`:`<span>${place}</span>`;return`<article class="video-podium-person video-podium-person--${place}" style="--player-color:${profile.color}"><div class="video-podium-avatar" style="background-image:linear-gradient(180deg,rgba(4,6,18,.01),rgba(4,6,18,.28)),url('${portrait.url}');background-position:${portrait.position};background-size:${portrait.size}">${playerBadge}</div><strong>${profile.nick}</strong><small>${caption}</small><div class="video-podium-step"><b>${place}º</b><span>${medal}</span></div></article>`;
  }

  function renderVideoPodium(container,profiles,captionFor) {
    const ordered=[profiles[1],profiles[0],profiles[2]],places=[2,1,3];container.innerHTML=ordered.map((profile,index)=>podiumPerson(profile,places[index],profile?captionFor(profile,places[index]):'')).join('');
  }

  function showVideoFinal() {
    const winnerBall=state.balls.find(ball=>!ball.isClone&&!ball.dead),damageTiebreak=!winnerBall;let winnerProfile,survivalProfiles;
    if(damageTiebreak){const rankedByDamage=[...state.profiles.values()].sort((a,b)=>b.damage-a.damage||b.kos-a.kos||(b.eliminatedAt||0)-(a.eliminatedAt||0)||a.nick.localeCompare(b.nick));winnerProfile=rankedByDamage[0];survivalProfiles=rankedByDamage.slice(0,3)}else{winnerProfile=winnerBall.profile;const eliminated=[...state.videoEliminationOrder].reverse();survivalProfiles=[winnerProfile,...eliminated.slice(0,2).map(entry=>entry.profile)]}if(!winnerProfile)return;
    const podiumTitle=videoSurvivalPodium.closest('section')?.querySelector('h2');if(podiumTitle)podiumTitle.textContent=damageTiebreak?'DESEMPATE POR DANO':'ÚLTIMOS SOBREVIVENTES';renderVideoPodium(videoSurvivalPodium,survivalProfiles,(profile,place)=>damageTiebreak?`${Math.round(profile.damage)} DANO${place===1?' • DESEMPATE':''}`:place===1?'CAMPEÃO':place===2?'ÚLTIMO ELIMINADO':'PENÚLTIMO ELIMINADO');
    videoChampionName.textContent=`${winnerProfile.nick} VENCEU!`;videoChampionName.style.color=winnerProfile.color;const confettiColors=['#34f4ff','#ffd15c','#ff4d8d','#9b69ff','#66ffa8','#ffffff'];videoConfetti.innerHTML=Array.from({length:96},(_,index)=>`<i style="--x:${Math.random()*100}%;--delay:${Math.random()*1.2}s;--duration:${2.4+Math.random()*1.8}s;--drift:${-55+Math.random()*110}px;--spin:${240+Math.random()*840}deg;--confetti:${confettiColors[index%confettiColors.length]}"></i>`).join('');videoFinal.hidden=false;interruptMusicForVictory();state.videoFinalShown=true;state.videoFinalPending=false;videoPauseButton.disabled=true;videoPauseButton.textContent='FINALIZADO';videoBattleStatus.textContent=damageTiebreak?`${winnerProfile.nick} venceu no desempate por dano • ${Math.round(winnerProfile.damage)} de dano`:`${winnerProfile.nick} venceu • pódio dos sobreviventes`;scheduleAutomaticRecordingFinish();
  }

  function showVideoFinalDuel() {
    const fighters=state.balls.filter(ball=>!ball.isClone&&!ball.dead);if(fighters.length!==2||state.videoFinalDuelShown)return;
    state.videoFinalDuelShown=true;state.videoFinalDuelPending=true;state.running=false;const draftId=state.videoDraftId,[fighterA,fighterB]=fighters,portraitA=roulettePortrait(fighterA.character),portraitB=roulettePortrait(fighterB.character);
    videoDuelAvatarA.style.backgroundImage=`linear-gradient(180deg,rgba(3,5,15,.02),rgba(3,5,15,.38)),url('${portraitA.url}')`;videoDuelAvatarA.style.backgroundPosition=portraitA.position;videoDuelAvatarA.style.backgroundSize=portraitA.size;videoDuelAvatarB.style.backgroundImage=`linear-gradient(180deg,rgba(3,5,15,.02),rgba(3,5,15,.38)),url('${portraitB.url}')`;videoDuelAvatarB.style.backgroundPosition=portraitB.position;videoDuelAvatarB.style.backgroundSize=portraitB.size;videoDuelNameA.textContent=fighterA.nick;videoDuelNameB.textContent=fighterB.nick;videoDuel.hidden=false;videoBattleStatus.textContent=`DUELO FINAL • ${fighterA.nick} VS ${fighterB.nick}`;
    synthTone(110,0,.5,.09,'sawtooth');synthTone(165,.12,.55,.075,'sawtooth');synthTone(440,.32,.35,.055,'square');
    setTimeout(()=>{if(draftId!==state.videoDraftId||state.viewMode!=='video')return;videoDuel.hidden=true;state.videoFinalDuelPending=false;if(playerBallCount()===2&&!state.videoFinalPending&&!state.videoFinalShown){state.running=true;state.lastTime=performance.now();videoBattleStatus.textContent=`Duelo em andamento • ${fighterA.nick} VS ${fighterB.nick}`}},2300);
  }

  function showVideoFinalKo(draftId) {
    const lastDeath=state.videoEliminationOrder[state.videoEliminationOrder.length-1];
    if(!lastDeath){showVideoFinal();return}
    state.videoFinalKoShown=true;const portrait=roulettePortrait(lastDeath.character),color=lastDeath.color||lastDeath.profile.color||'#ff4d6d';
    videoKo.style.setProperty('--ko-color',color);videoKoBall.style.backgroundImage=`linear-gradient(180deg,rgba(3,5,15,.02),rgba(3,5,15,.44)),url('${portrait.url}')`;videoKoBall.style.backgroundPosition=portrait.position;videoKoBall.style.backgroundSize=portrait.size;videoKoName.textContent=`${lastDeath.profile.nick} ELIMINADO`;videoKo.hidden=false;videoBattleStatus.textContent=`K.O. • ${lastDeath.profile.nick} foi o último eliminado`;
    const startedAt=performance.now(),audio=playKoSound();let finished=false;
    const finish=()=>{if(finished)return;finished=true;const remaining=Math.max(0,1100-(performance.now()-startedAt));setTimeout(()=>{if(draftId!==state.videoDraftId||state.viewMode!=='video')return;videoKo.hidden=true;showVideoFinal()},remaining)};
    audio.addEventListener('ended',finish,{once:true});audio.addEventListener('error',finish,{once:true});setTimeout(finish,4000);
  }

  function checkVideoBattleEnd() {
    if(state.viewMode!=='video'||!state.videoBattleStarted||state.videoFinalPending||state.videoFinalShown)return;const survivors=playerBallCount();if(survivors===2&&!state.videoFinalDuelShown){showVideoFinalDuel();return}if(survivors>1)return;videoDuel.hidden=true;state.videoFinalDuelPending=false;state.videoFinalPending=true;state.running=false;const draftId=state.videoDraftId;setTimeout(()=>{if(draftId!==state.videoDraftId||playerBallCount()>1)return;showVideoFinalKo(draftId)},260);
  }

  function nearestEnemy(source) {
    let nearest=null,nearestDistance=Infinity;
    for(const candidate of state.balls){if(candidate===source||candidate.dead||sameCloneFamily(candidate,source)||thorfinnPhased(candidate)||subaruIntangible(candidate)||genosCritical(candidate))continue;const distance=(candidate.x-source.x)**2+(candidate.y-source.y)**2;if(distance<nearestDistance){nearestDistance=distance;nearest=candidate}}
    return nearest;
  }

  function farthestEnemy(source) {
    let farthest=null,farthestDistance=-1;for(const candidate of state.balls){if(candidate===source||candidate.dead||sameCloneFamily(candidate,source)||thorfinnPhased(candidate)||subaruIntangible(candidate)||genosCritical(candidate))continue;const distance=(candidate.x-source.x)**2+(candidate.y-source.y)**2;if(distance>farthestDistance){farthestDistance=distance;farthest=candidate}}return farthest;
  }

  function spawnSubaruShadows(subaru,killer,x,y) {
    const target=killer&&!killer.dead?killer:nearestEnemy(subaru),targetX=target?target.x:x+Math.cos(Math.random()*Math.PI*2)*state.width*.4,targetY=target?target.y:y+Math.sin(Math.random()*Math.PI*2)*state.height*.4,baseAngle=Math.atan2(targetY-y,targetX-x),speed=state.width*.34,sharedHitIds=new Set();for(const spread of [-.3,-.1,.1,.3]){const angle=baseAngle+spread;state.projectiles.push({type:'subaruShadow',owner:subaru,target,x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,angle,radius:18,damage:4,life:5,rotation:Math.random()*Math.PI*2,trailPoints:[{x,y}],nextTrailAt:state.time,hitIds:sharedHitIds})}
  }

  function nearestShadowTarget(projectile) {
    let target=null,nearestDistance=Infinity;for(const candidate of state.balls){if(candidate===projectile.owner||candidate.dead||sameCloneFamily(candidate,projectile.owner)||thorfinnPhased(candidate)||subaruIntangible(candidate)||projectile.hitIds.has(candidate.id))continue;const distance=(candidate.x-projectile.x)**2+(candidate.y-projectile.y)**2;if(distance<nearestDistance){nearestDistance=distance;target=candidate}}return target;
  }

  function trySubaruReturn(subaru,killer) {
    if(subaru.character!=='char6'||!subaru.subaruReturnReady||subaru.dead)return false;const deathX=subaru.x,deathY=subaru.y,targetTime=state.time-5,history=subaru.subaruHistory||[];let snapshot=history[0]||{x:subaru.x,y:subaru.y,vx:subaru.vx,vy:subaru.vy,hp:subaru.maxHp,rotation:subaru.rotation};for(const memory of history){if(memory.time<=targetTime)snapshot=memory;else break}const videoBalance=videoCharacterBalance(subaru),returnHp=videoBalance?.returnHp??SUBARU_RETURN_HP,returnCooldown=videoBalance?.returnCooldown??SUBARU_RETURN_COOLDOWN;playCharacterCue('char6','power',{volume:.9});subaru.hp=subaru.maxHp*returnHp;subaru.x=Math.max(subaru.radius,Math.min(state.width-subaru.radius,snapshot.x));subaru.y=Math.max(subaru.radius,Math.min(state.height-subaru.radius,snapshot.y));subaru.vx=snapshot.vx;subaru.vy=snapshot.vy;subaru.rotation=snapshot.rotation;subaru.subaruReturnReady=false;subaru.subaruReturnReadyAt=state.time+returnCooldown;subaru.subaruInvulnerableUntil=state.time+1;subaru.subaruHistory=[];subaru.subaruNextSnapshotAt=state.time+.1;subaru.poisonedUntil=0;state.subaruRewindUntil=state.time+.95;spawnSubaruShadows(subaru,killer,deathX,deathY);createBurst(deathX,deathY,'#1b1029',55);createBurst(subaru.x,subaru.y,'#c797ff',38);state.floaters.push({x:subaru.x,y:subaru.y-subaru.radius-12,color:'#e0bdff',text:`RETORNO PELA MORTE • ${Math.round(returnHp*100)}% HP`,life:1.45,maxLife:1.45});return true;
  }

  function updateSubaruPowers() {
    for(const subaru of state.balls){if(subaru.dead||subaru.character!=='char6')continue;if(!subaru.subaruReturnReady&&state.time>=subaru.subaruReturnReadyAt){subaru.subaruReturnReady=true;createBurst(subaru.x,subaru.y,'#c797ff',24);state.floaters.push({x:subaru.x,y:subaru.y-subaru.radius-8,color:'#ddb8ff',text:'RETORNO PRONTO',life:1,maxLife:1})}if(state.time>=subaru.subaruNextSnapshotAt){subaru.subaruHistory.push({time:state.time,x:subaru.x,y:subaru.y,vx:subaru.vx,vy:subaru.vy,hp:subaru.hp,rotation:subaru.rotation});subaru.subaruHistory=subaru.subaruHistory.filter(memory=>memory.time>=state.time-6);subaru.subaruNextSnapshotAt=state.time+.1}}
  }

  function healSubaruFromShadow(subaru) {
    if(subaru.dead)return;const videoBalance=videoCharacterBalance(subaru),healingLimit=subaru.maxHp*(videoBalance?.shadowHealLimit??SUBARU_SHADOW_HEAL_LIMIT),minimumAfterHit=subaru.maxHp*(videoBalance?.shadowHealTarget??SUBARU_SHADOW_HEAL_TARGET);if(subaru.hp>=healingLimit)return;const restored=Math.min(healingLimit-subaru.hp,Math.max(8,minimumAfterHit-subaru.hp));if(restored<=0)return;subaru.hp+=restored;createBurst(subaru.x,subaru.y,'#bb7ee8',16);state.floaters.push({x:subaru.x,y:subaru.y-subaru.radius-9,color:'#dcb0ff',text:`SOMBRA • +${Math.round(restored)} HP`,life:.85,maxLife:.85});
  }

  function updateThorfinnPowers() {
    let rankingChanged=false;for(const thorfinn of state.balls){if(thorfinn.dead||thorfinn.character!=='char4')continue;if(state.time>=thorfinn.thorfinnAudioStopsAt){stopCharacterAudio(thorfinn);thorfinn.thorfinnAudioStopsAt=Infinity}if(state.time>=thorfinn.thorfinnNextPhaseAt){thorfinn.thorfinnPhaseUntil=state.time+5;thorfinn.thorfinnAudioStopsAt=thorfinn.thorfinnPhaseUntil;thorfinn.thorfinnNextPhaseAt=state.time+15;playCharacterCue('char4','power',{volume:.3,owner:thorfinn});createBurst(thorfinn.x,thorfinn.y,'#c9f59c',26);state.floaters.push({x:thorfinn.x,y:thorfinn.y-thorfinn.radius-10,color:'#dfffb7',text:'EU NÃO TENHO INIMIGOS',life:1.5,maxLife:1.5})}if(state.time>=thorfinn.thorfinnNextPointAt){thorfinn.thorfinnNextPointAt+=1;if(scoringEnabled()&&!thorfinn.isBot){thorfinn.profile.score+=1;thorfinn.thorfinnPassiveTicks+=1;rankingChanged=true;if(thorfinn.thorfinnPassiveTicks%3===0)state.floaters.push({x:thorfinn.x,y:thorfinn.y-thorfinn.radius-7,color:'#d7f5ad',text:'+1 PAZ',life:.7,maxLife:.7})}}}if(rankingChanged)renderRanking();
  }

  function updateThorfinnVideoVictory() {
    const thorfinn=state.balls.find(ball=>!ball.dead&&!ball.isClone&&ball.character==='char4'&&ball.tier==='video'),finalists=state.balls.filter(ball=>!ball.dead&&!ball.isClone);
    if(!thorfinn||finalists.length!==2){if(thorfinn){thorfinn.thorfinnFinalWinAt=Infinity;thorfinn.thorfinnFinalLastSecond=-1}return}
    if(!Number.isFinite(thorfinn.thorfinnFinalWinAt)){thorfinn.thorfinnFinalWinAt=state.time+10;thorfinn.thorfinnFinalLastSecond=10;state.floaters.push({x:thorfinn.x,y:thorfinn.y-thorfinn.radius-14,color:'#efffcf',text:'PAZ • SOBREVIVA 10s',life:1.2,maxLife:1.2});if(state.viewMode==='video')videoBattleStatus.textContent='THORFINN • SOBREVIVA 10 SEGUNDOS PARA VENCER'}
    const remaining=Math.max(0,Math.ceil(thorfinn.thorfinnFinalWinAt-state.time));if(remaining!==thorfinn.thorfinnFinalLastSecond){thorfinn.thorfinnFinalLastSecond=remaining;state.floaters.push({x:thorfinn.x,y:thorfinn.y-thorfinn.radius-12,color:'#efffcf',text:`PAZ • ${remaining}`,life:.9,maxLife:.9})}
    if(state.time<thorfinn.thorfinnFinalWinAt)return;for(const enemy of finalists){if(enemy===thorfinn)continue;enemy.hp=0;enemy.dead=true;stopCharacterAudio(enemy);recordVideoElimination(enemy);enemy.profile.active=false;for(const clone of state.balls){if(clone.isClone&&sameCloneFamily(clone,enemy)){clone.dead=true;stopCharacterAudio(clone)}}createBurst(enemy.x,enemy.y,'#efffcf',38);thorfinn.profile.kos+=1}thorfinn.thorfinnFinalWinAt=Infinity;state.floaters.push({x:thorfinn.x,y:thorfinn.y-thorfinn.radius-14,color:'#efffcf',text:'A PAZ VENCEU!',life:1.5,maxLife:1.5});
  }

  function activateRudeusForesight(rudeus) {
    rudeus.rudeusForesightUntil=state.time+balancedDuration('char17',4);rudeus.rudeusNextDodgeAt=state.time;rudeus.rudeusDodges=0;rudeus.nextPowerAt=state.time+balancedCooldown('char17',8);playCharacterCue('char17','power',{volume:.7});
    const target=farthestEnemy(rudeus);if(target){const centerAngle=Math.atan2(target.y-rudeus.y,target.x-rudeus.x),speed=state.width*.4;for(let rock=0;rock<5;rock++){const angle=centerAngle+(rock-2)*.115;state.projectiles.push({type:'stone',owner:rudeus,x:rudeus.x+Math.cos(angle)*(rudeus.radius+12),y:rudeus.y+Math.sin(angle)*(rudeus.radius+12),vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,angle,radius:10+(rock%2)*2,damage:balancedDamage('char17',5),life:3,rotation:Math.random()*Math.PI*2})}}
    createBurst(rudeus.x,rudeus.y,'#b7f67b',30);state.floaters.push({x:rudeus.x,y:rudeus.y-rudeus.radius-9,color:'#c9ff8f',text:'OLHO DEMONÍACO',life:1.15,maxLife:1.15});
  }

  function predictedImpactTime(rudeus,x,y,vx,vy,combinedRadius) {
    const px=x-rudeus.x,py=y-rudeus.y,rvx=vx-rudeus.vx,rvy=vy-rudeus.vy,speedSquared=rvx*rvx+rvy*rvy;if(speedSquared<1)return null;const time=-((px*rvx+py*rvy)/speedSquared);if(time<=0||time>1)return null;const closestX=px+rvx*time,closestY=py+rvy*time;return closestX*closestX+closestY*closestY<=combinedRadius*combinedRadius?time:null;
  }

  function updateRudeusForesight() {
    for(const rudeus of state.balls){if(rudeus.dead||rudeus.character!=='char17'||state.time>=rudeus.rudeusForesightUntil||state.time<rudeus.rudeusNextDodgeAt||rudeus.rudeusDodges>=3)continue;let threat=null,earliest=Infinity;
      for(const candidate of state.balls){if(candidate===rudeus||candidate.dead||sameCloneFamily(candidate,rudeus))continue;const time=predictedImpactTime(rudeus,candidate.x,candidate.y,candidate.vx,candidate.vy,rudeus.radius+candidate.radius+4);if(time!==null&&time<earliest){earliest=time;threat={x:candidate.x,y:candidate.y,vx:candidate.vx,vy:candidate.vy}}}
      for(const projectile of state.projectiles){if(!projectile.owner||projectile.owner===rudeus||projectile.owner.dead||sameCloneFamily(projectile.owner,rudeus)||typeof projectile.vx!=='number'||typeof projectile.vy!=='number')continue;const projectileRadius=projectile.radius||12,time=predictedImpactTime(rudeus,projectile.x,projectile.y,projectile.vx,projectile.vy,rudeus.radius+projectileRadius+5);if(time!==null&&time<earliest){earliest=time;threat={x:projectile.x,y:projectile.y,vx:projectile.vx,vy:projectile.vy}}}
      if(!threat)continue;const speed=Math.hypot(threat.vx,threat.vy)||1,perpX=-threat.vy/speed,perpY=threat.vx/speed,dodgeDistance=rudeus.radius*2.8;const clearanceA=Math.min(rudeus.x+perpX*dodgeDistance,state.width-(rudeus.x+perpX*dodgeDistance),rudeus.y+perpY*dodgeDistance,state.height-(rudeus.y+perpY*dodgeDistance)),clearanceB=Math.min(rudeus.x-perpX*dodgeDistance,state.width-(rudeus.x-perpX*dodgeDistance),rudeus.y-perpY*dodgeDistance,state.height-(rudeus.y-perpY*dodgeDistance)),side=clearanceA>=clearanceB?1:-1;
      rudeus.vx=perpX*side*rudeus.moveSpeed*2.2;rudeus.vy=perpY*side*rudeus.moveSpeed*2.2;rudeus.rudeusDodgeUntil=state.time+.45;rudeus.rudeusNextDodgeAt=state.time+.7;rudeus.rudeusDodges+=1;rudeus.rudeusAfterimageUntil=state.time+.35;rudeus.rudeusVisionUntil=state.time+.45;rudeus.rudeusVisionX=threat.x+threat.vx*earliest;rudeus.rudeusVisionY=threat.y+threat.vy*earliest;createBurst(rudeus.x,rudeus.y,'#c9ff8f',16);state.floaters.push({x:rudeus.x,y:rudeus.y-rudeus.radius-7,color:'#d8ffa9',text:'PREVIU • ESQUIVA',life:.75,maxLife:.75});
    }
  }

  function castGetsuga(ichigo) {
    const target=nearestEnemy(ichigo);
    if(!target){ichigo.nextPowerAt=state.time+1;return}
    const dx=target.x-ichigo.x,dy=target.y-ichigo.y,distance=Math.hypot(dx,dy)||1,angle=Math.atan2(dy,dx),speed=state.width*.48;playCharacterCue('char21','power',{volume:.8});
    state.projectiles.push({type:'getsuga',owner:ichigo,x:ichigo.x+dx/distance*(ichigo.radius+12),y:ichigo.y+dy/distance*(ichigo.radius+12),vx:dx/distance*speed,vy:dy/distance*speed,angle,radius:88,damage:balancedDamage('char21',18),life:2.6,hitIds:new Set()});
    ichigo.nextPowerAt=state.time+balancedCooldown('char21',10);createBurst(ichigo.x,ichigo.y,'#ff263f',18);
  }

  function syncLuffyNextPower(luffy) {
    const waiting=[];for(let arm=0;arm<2;arm++)if(!luffy.luffyArmActive[arm])waiting.push(luffy.luffyArmReadyAt[arm]);luffy.nextPowerAt=waiting.length?Math.min(...waiting):Infinity;
  }

  function castGomuPunches(luffy) {
    const speed=state.width*.5;let launched=0;for(let arm=0;arm<2;arm++){if(luffy.luffyArmActive[arm]||state.time<luffy.luffyArmReadyAt[arm])continue;const angle=Math.random()*Math.PI*2;luffy.luffyArmActive[arm]=true;state.projectiles.push({type:'gomuFist',owner:luffy,armIndex:arm,x:luffy.x+Math.cos(angle)*(luffy.radius+14),y:luffy.y+Math.sin(angle)*(luffy.radius+14),vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,radius:22,damage:balancedDamage('char22',25),phase:'extending',distance:0,maxDistance:Infinity,bounces:0,maxBounces:Infinity,trailPoints:[],life:Infinity});launched++}syncLuffyNextPower(luffy);if(launched){playCharacterCue('char22','power',{volume:.78});createBurst(luffy.x,luffy.y,'#ffc06a',14)}
  }

  function castRasenShuriken(naruto) {
    const zoneRadius=Math.max(62,state.width*.1),margin=zoneRadius+8,targetX=margin+Math.random()*(state.width-margin*2),targetY=margin+Math.random()*(state.height-margin*2),dx=targetX-naruto.x,dy=targetY-naruto.y,distance=Math.hypot(dx,dy)||1,speed=state.width*.55;
    if(!naruto.isClone){stopCharacterAudio(naruto);playCharacterCue('char25','power',{volume:.72,owner:naruto})}state.projectiles.push({type:'rasenShuriken',owner:naruto,x:naruto.x,y:naruto.y,vx:dx/distance*speed,vy:dy/distance*speed,targetX,targetY,radius:24,zoneRadius,phase:'flying',rotation:0,life:8,nextDamageAt:Infinity,damage:4.5});
    naruto.nextPowerAt=state.time+18;createBurst(naruto.x,naruto.y,'#55d9ff',22);
  }

  function lightningPath(x1,y1,x2,y2,segments=10,jitter=36) {
    const points=[{x:x1,y:y1}],dx=x2-x1,dy=y2-y1,length=Math.hypot(dx,dy)||1,nx=-dy/length,ny=dx/length;
    for(let i=1;i<segments;i++){const t=i/segments,offset=(Math.random()-.5)*jitter*(.55+Math.sin(t*Math.PI)*.7);points.push({x:x1+dx*t+nx*offset,y:y1+dy*t+ny*offset})}points.push({x:x2,y:y2});return points;
  }

  function createLightningBolt(x1,y1,x2,y2,impactRadius=0) {
    const main=lightningPath(x1,y1,x2,y2),paths=[main];
    for(let branch=0;branch<2;branch++){const start=main[3+Math.floor(Math.random()*5)],direction=Math.random()<.5?-1:1;paths.push(lightningPath(start.x,start.y,start.x+direction*(35+Math.random()*70),start.y+35+Math.random()*80,5,18))}
    return{paths,life:.24,maxLife:.24,impactX:x2,impactY:y2,impactRadius};
  }

  function startPikachuCharge(pikachu) {
    if(pikachu.pikachuCharging)return;pikachu.pikachuCharging=true;pikachu.pikachuStormReleaseAt=state.time+2;pikachu.nextPowerAt=Infinity;playCharacterCue('char26','power',{volume:.72,owner:pikachu});createBurst(pikachu.x,pikachu.y,'#fff27a',24);state.floaters.push({x:pikachu.x,y:pikachu.y-pikachu.radius-9,color:'#fff58b',text:'TEMPESTADE • CARREGANDO',life:1.8,maxLife:1.8});
  }

  function castThunderStorm(pikachu) {
    if(!pikachu.pikachuCharging||pikachu.dead)return;pikachu.pikachuCharging=false;pikachu.pikachuStormReleaseAt=Infinity;state.projectiles.push({type:'thunderStorm',owner:pikachu,life:3.75,damage:balancedDamage('char26',4.8),strikeRadius:Math.max(58,state.width*.1),nextStrikeAt:state.time+.08,bolts:[],flash:1});pikachu.nextPowerAt=state.time+balancedCooldown('char26',10);createBurst(pikachu.x,pikachu.y,'#ffe342',34);state.floaters.push({x:pikachu.x,y:pikachu.y-pikachu.radius-8,color:'#ffe86b',text:'TEMPESTADE DE RAIOS',life:1.2,maxLife:1.2});
  }

  function spawnAlCompanion(edward) {
    const radius=edward.radius*1.05,position=findFreePosition(radius),angle=Math.random()*Math.PI*2,moveSpeed=state.width*.14;
    state.companions.push({type:'al',id:state.nextId++,owner:edward,x:position.x,y:position.y,vx:Math.cos(angle)*moveSpeed,vy:Math.sin(angle)*moveSpeed,radius,moveSpeed,baseMoveSpeed:moveSpeed,rotation:0,activeUntil:Infinity,nextDamageAt:state.time});
    createBurst(position.x,position.y,'#7cecff',22);
  }

  function spawnSoccerBall(isagi) {
    const radius=isagi.radius*.58,baseMoveSpeed=state.width*.18,travelAngle=Math.atan2(isagi.vy,isagi.vx),distance=isagi.radius+radius+5;
    const x=Math.max(radius,Math.min(state.width-radius,isagi.x+Math.cos(travelAngle)*distance)),y=Math.max(radius,Math.min(state.height-radius,isagi.y+Math.sin(travelAngle)*distance));
    state.companions.push({type:'soccerBall',id:state.nextId++,owner:isagi,x,y,vx:Math.cos(travelAngle)*baseMoveSpeed,vy:Math.sin(travelAngle)*baseMoveSpeed,radius,moveSpeed:baseMoveSpeed,baseMoveSpeed,rotation:0,boostUntil:0});
    isagi.soccerBallSpawned=true;isagi.isagiAudioReadyAt=state.time+2.5;playCharacterCue('char15','power',{volume:.78,owner:isagi});createBurst(x,y,'#5ba6ff',28);state.floaters.push({x,y:y-radius-8,color:'#9bc7ff',text:'DIRECT SHOT!',life:1.15,maxLife:1.15});
  }

  function updateIsagiPowers() {
    for(const isagi of state.balls){if(isagi.dead||isagi.character!=='char15'||isagi.soccerBallSpawned||state.time<isagi.nextSoccerBallAt)continue;spawnSoccerBall(isagi)}
  }

  function castAlchemyLink(edward) {
    const al=state.companions.find(companion=>companion.owner===edward);
    if(!al){spawnAlCompanion(edward);edward.nextPowerAt=state.time+1;return}
    al.activeUntil=Infinity;al.nextDamageAt=state.time;edward.nextPowerAt=Infinity;
    createBurst(edward.x,edward.y,'#e6bd4e',26);createBurst(al.x,al.y,'#7cecff',26);
    state.floaters.push({x:(edward.x+al.x)/2,y:(edward.y+al.y)/2-12,color:'#ffe77c',text:'LIGAÇÃO ALQUÍMICA',life:1.2,maxLife:1.2});
  }

  function castPredator(rimuru) {
    const target=nearestEnemy(rimuru);
    if(!target){rimuru.nextPowerAt=state.time+1;return}
    const zoneRadius=Math.max(91,state.width*.1495);playCharacterCue('char28','power',{volume:.64});
    state.projectiles.push({type:'predator',owner:rimuru,x:target.x,y:target.y,radius:zoneRadius,life:5,totalLife:5,damage:balancedDamage('char28',4),nextDamageAt:state.time+.25,rotation:0});
    rimuru.nextPowerAt=state.time+videoCharacterCooldown(rimuru,balancedCooldown('char28',12));createBurst(rimuru.x,rimuru.y,'#78e9ff',30);createBurst(target.x,target.y,'#7658ff',28);
    state.floaters.push({x:target.x,y:target.y-zoneRadius-8,color:'#9cecff',text:'PREDADOR • BEELZEBUTH',life:1.35,maxLife:1.35});
  }

  function castShadowPossession(shikamaru) {
    const enemies=state.balls.filter(ball=>ball!==shikamaru&&!ball.dead&&!sameCloneFamily(ball,shikamaru)).sort((a,b)=>Math.hypot(a.x-shikamaru.x,a.y-shikamaru.y)-Math.hypot(b.x-shikamaru.x,b.y-shikamaru.y));if(!enemies.length){shikamaru.nextPowerAt=state.time+1;return}
    playCharacterCue('char31','power',{volume:.72,owner:shikamaru});
    const targets=enemies.length===1?[enemies[0],enemies[0]]:enemies.slice(0,2),speed=state.width*.74;
    targets.forEach((target,index)=>{const fan=targets[0]===targets[1]?(index?1:-1)*.075:0,angle=Math.atan2(target.y-shikamaru.y,target.x-shikamaru.x)+fan;state.projectiles.push({type:'shadowPossession',owner:shikamaru,x:shikamaru.x,y:shikamaru.y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,radius:16,damage:8.5,phase:'seeking',boundTarget:null,life:1.5,maxLife:1.5,trailPoints:[]})});
    shikamaru.nextPowerAt=state.time+7.5;createBurst(shikamaru.x,shikamaru.y,'#839b64',22);state.floaters.push({x:shikamaru.x,y:shikamaru.y-shikamaru.radius-8,color:'#b8d38d',text:'KAGE MANE • 2 SOMBRAS!',life:1,maxLife:1});
  }

  function castNamiThunderBubble(nami) {
    const target=nearestEnemy(nami);if(!target){nami.nextPowerAt=state.time+1;return}const targetX=target.x,targetY=target.y,dx=targetX-nami.x,dy=targetY-nami.y,distance=Math.hypot(dx,dy)||1,speed=state.width*.48;
    playCharacterCue('char32','power',{volume:.7,owner:nami});
    state.projectiles.push({type:'namiThunderBubble',owner:nami,target,x:nami.x,y:nami.y,targetX,targetY,vx:dx/distance*speed,vy:dy/distance*speed,radius:Math.max(82,state.width*.125),damage:5.2,phase:'flying',life:6,maxLife:6,nextStrikeAt:Infinity,rotation:Math.random()*Math.PI*2,flash:0,bolts:[]});
    nami.nextPowerAt=state.time+7.8;createBurst(nami.x,nami.y,'#72ddff',18);state.floaters.push({x:nami.x,y:nami.y-nami.radius-8,color:'#a9ecff',text:'THUNDER CLOUD!',life:.9,maxLife:.9});
  }

  function strikeNamiThunderBubble(projectile){projectile.flash=1;projectile.bolts=Array.from({length:5},()=>({angle:Math.random()*Math.PI*2,length:projectile.radius*(.45+Math.random()*.55),jitter:Math.random()*100,life:.24,maxLife:.24}));let hits=0;for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner)||thorfinnPhased(ball))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<=projectile.radius+ball.radius*.45){applyProjectileDamage(ball,projectile.owner,projectile.damage);createBurst(ball.x,ball.y,'#ffe968',9);hits+=1}}if(hits)state.floaters.push({x:projectile.x,y:projectile.y-projectile.radius*.55,color:'#fff083',text:`THUNDER CLOUD • ${hits} HIT${hits>1?'S':''}`,life:.58,maxLife:.58});projectile.nextStrikeAt=state.time+.72}

  function addMinatoFlashTrail(minato,fromX,fromY,toX,toY){state.projectiles.push({type:'minatoFlashTrail',owner:minato,x:toX,y:toY,fromX,fromY,toX,toY,life:.34,maxLife:.34})}
  function minatoEdgePoint(angle,bounds,margin=26){
    const centerX=(bounds.left+bounds.right)/2,centerY=(bounds.top+bounds.bottom)/2,dx=Math.cos(angle),dy=Math.sin(angle),times=[];
    if(Math.abs(dx)>.0001)times.push(((dx>0?bounds.right-margin:bounds.left+margin)-centerX)/dx);
    if(Math.abs(dy)>.0001)times.push(((dy>0?bounds.bottom-margin:bounds.top+margin)-centerY)/dy);
    const distance=Math.min(...times.filter(value=>value>0));
    return{x:centerX+dx*distance,y:centerY+dy*distance};
  }
  function castMinatoHiraishin(minato){
    state.projectiles=state.projectiles.filter(projectile=>projectile.owner!==minato||projectile.type!=='minatoKunai');const bounds=arenaBounds(),baseAngle=Math.random()*Math.PI*2,speed=state.width*1.15;
    for(let index=0;index<3;index++){const target=minatoEdgePoint(baseAngle+index*Math.PI*2/3,bounds,minato.radius+5),dx=target.x-minato.x,dy=target.y-minato.y,length=Math.hypot(dx,dy)||1;state.projectiles.push({type:'minatoKunai',owner:minato,x:minato.x,y:minato.y,targetX:target.x,targetY:target.y,vx:dx/length*speed,vy:dy/length*speed,angle:Math.atan2(dy,dx),phase:'flying',used:false,life:4.2,maxLife:4.2,index})}
    minato.nextPowerAt=state.time+10;minato.minatoSequenceAt=state.time+1;minato.minatoSequenceStep=0;minato.minatoSequenceHitIds=new Set();minato.minatoDashSoundPending=false;createBurst(minato.x,minato.y,'#ffe36b',30);state.floaters.push({x:minato.x,y:minato.y-minato.radius-10,color:'#fff092',text:'HIRAISHIN • 3 EXTREMIDADES',life:1.15,maxLife:1.15});
  }
  function updateMinatoPowers(){
    for(const minato of state.balls){
      if(minato.dead||minato.character!=='char33'||state.time<(minato.minatoSequenceAt||Infinity))continue;
      const kunais=state.projectiles.filter(projectile=>projectile.type==='minatoKunai'&&projectile.owner===minato&&!projectile.used&&projectile.life>0).sort((a,b)=>a.index-b.index);
      if(!kunais.length){minato.minatoSequenceAt=Infinity;continue}
      const kunai=kunais[0];if(kunai.phase!=='stuck'){minato.minatoSequenceAt=state.time+.05;continue}
      if(!minato.minatoDashSoundPending){playCharacterCue('char33','power',{volume:.74,owner:minato});minato.minatoDashSoundPending=true;minato.minatoSequenceAt=state.time+.16;continue}
      const fromX=minato.x,fromY=minato.y,toX=kunai.x,toY=kunai.y;kunai.used=true;kunai.life=Math.min(kunai.life,.36);addMinatoFlashTrail(minato,fromX,fromY,toX,toY);
      for(const target of state.balls){if(target===minato||target.dead||sameCloneFamily(target,minato)||thorfinnPhased(target)||(minato.minatoSequenceHitIds?.has(target.id)))continue;if(pointSegmentDistance(target.x,target.y,fromX,fromY,toX,toY)<=target.radius+15){applyProjectileDamage(target,minato,16);minato.minatoSequenceHitIds.add(target.id);target.knockbackUntil=state.time+.16;createBurst(target.x,target.y,'#ffe36b',18)}}
      minato.x=toX;minato.y=toY;minato.minatoSequenceStep+=1;createBurst(toX,toY,'#ffe36b',26);state.floaters.push({x:toX,y:toY-minato.radius-7,color:'#fff092',text:`HIRAISHIN ${minato.minatoSequenceStep}/3`,life:.55,maxLife:.55});
      minato.minatoDashSoundPending=false;minato.minatoSequenceAt=kunais.length>1?state.time+.72:Infinity;
    }
  }

  const CAIN_ELEMENTS=[
    {id:'fire',label:'FOGO',color:'#ff593d',damage:27},
    {id:'earth',label:'TERRA',color:'#b58a58',damage:11},
    {id:'water',label:'ÁGUA',color:'#50c9ff',damage:12},
    {id:'lightning',label:'RAIO',color:'#ffe34d',damage:15},
    {id:'light',label:'LUZ',color:'#fff4bb',damage:14}
  ];
  function chargeCainElement(cain){
    const element=CAIN_ELEMENTS[cain.cainElementIndex%CAIN_ELEMENTS.length],orbitAngle=state.time*1.65+cain.cainElementIndex*Math.PI*2/CAIN_ELEMENTS.length;
    state.projectiles.push({type:'cainElementOrb',owner:cain,element:element.id,elementLabel:element.label,color:element.color,damage:element.damage,phase:'orbit',orbitAngle,orbitDistance:cain.radius+26,radius:14,x:cain.x,y:cain.y,vx:0,vy:0,life:999,maxLife:999,hitIds:new Set()});
    cain.cainElementIndex+=1;createBurst(cain.x,cain.y,element.color,16);state.floaters.push({x:cain.x,y:cain.y-cain.radius-8,color:element.color,text:`${element.label} • ${cain.cainElementIndex}/5`,life:.75,maxLife:.75});
    if(cain.cainElementIndex>=CAIN_ELEMENTS.length){cain.cainReleaseAt=state.time+.42;cain.nextPowerAt=Infinity}else cain.nextPowerAt=state.time+1.5;
  }
  function releaseCainElements(cain){
    const orbs=state.projectiles.filter(projectile=>projectile.type==='cainElementOrb'&&projectile.owner===cain&&projectile.phase==='orbit');
    playCharacterCue('char34','power',{volume:.72,owner:cain});
    for(const orb of orbs){const angle=orb.orbitAngle,speed=state.width*.48;orb.phase='flying';orb.vx=Math.cos(angle)*speed;orb.vy=Math.sin(angle)*speed;orb.angle=angle;orb.life=3.2;orb.maxLife=3.2;orb.hitIds=new Set()}
    cain.cainElementIndex=0;cain.cainReleaseAt=Infinity;cain.nextPowerAt=state.time+1.5;createBurst(cain.x,cain.y,'#eee7ff',45);state.floaters.push({x:cain.x,y:cain.y-cain.radius-12,color:'#eee7ff',text:'MAGIA QUÍNTUPLA!',life:1.1,maxLife:1.1});
  }
  function updateCainPowers(){for(const cain of state.balls){if(cain.dead||cain.character!=='char34'||state.time<(cain.cainReleaseAt||Infinity))continue;releaseCainElements(cain)}}
  function metalBatSwingProgress(metalBat){return Math.max(0,Math.min(1,(state.time-metalBat.metalBatSwingStartedAt)/.72))}
  function metalBatSwingAngle(metalBat){const progress=metalBatSwingProgress(metalBat),eased=1-(1-progress)*(1-progress);return metalBat.metalBatSwingStartAngle+eased*Math.PI*2}
  function metalBatStrength(metalBat){return Math.max(0,Math.min(100,(1-metalBat.hp/metalBat.maxHp)*100))}
  function metalBatSpiritColor(strength){return strength>=80?'#ff4b43':strength>=45?'#ffd257':'#56bfff'}
  function castMetalBatSwing(metalBat){
    const strength=metalBatStrength(metalBat);metalBat.metalBatSwingStartedAt=state.time;metalBat.metalBatSwingUntil=state.time+.72;metalBat.metalBatSwingStartAngle=Math.atan2(metalBat.vy,metalBat.vx)-Math.PI*.55;metalBat.metalBatSwingHitIds=new Set();metalBat.metalBatSwingSoundPlayed=false;metalBat.metalBatSwingDamage=11+strength*.12;metalBat.nextPowerAt=state.time+4;createBurst(metalBat.x,metalBat.y,metalBatSpiritColor(strength),26);state.floaters.push({x:metalBat.x,y:metalBat.y-metalBat.radius-11,color:metalBatSpiritColor(strength),text:`ESPÍRITO DE LUTA • ${Math.round(strength)}%`,life:.95,maxLife:.95});
  }
  function updateMetalBatPowers(){
    for(const metalBat of state.balls){if(metalBat.dead||metalBat.character!=='char35'||state.time>=(metalBat.metalBatSwingUntil||-Infinity))continue;const angle=metalBatSwingAngle(metalBat),reach=metalBat.radius*2.75,toX=metalBat.x+Math.cos(angle)*reach,toY=metalBat.y+Math.sin(angle)*reach;for(const target of state.balls){if(target===metalBat||target.dead||sameCloneFamily(target,metalBat)||thorfinnPhased(target)||subaruIntangible(target)||genosCritical(target)||metalBat.metalBatSwingHitIds.has(target.id))continue;if(pointSegmentDistance(target.x,target.y,metalBat.x,metalBat.y,toX,toY)>target.radius+12)continue;metalBat.metalBatSwingHitIds.add(target.id);if(!metalBat.metalBatSwingSoundPlayed){metalBat.metalBatSwingSoundPlayed=true;playCharacterCue('char35','hit',{volume:.82,owner:metalBat})}applyProjectileDamage(target,metalBat,metalBat.metalBatSwingDamage);if(!target.dead){const dx=target.x-metalBat.x,dy=target.y-metalBat.y,distance=Math.hypot(dx,dy)||1;target.vx=dx/distance*target.moveSpeed*2.25;target.vy=dy/distance*target.moveSpeed*2.25;target.knockbackUntil=state.time+.48}createBurst(target.x,target.y,metalBatSpiritColor(metalBatStrength(metalBat)),28);state.floaters.push({x:target.x,y:target.y-target.radius-9,color:'#fff0be',text:'HOME RUN!',life:.8,maxLife:.8})}}
    for(const metalBat of state.balls){if(metalBat.dead||metalBat.character!=='char35'||state.time<(metalBat.metalBatSwingUntil||-Infinity)||!Number.isFinite(metalBat.metalBatSwingUntil))continue;metalBat.metalBatSwingUntil=-Infinity;metalBat.metalBatSwingHitIds.clear()}
  }
  function strikeCainOrb(projectile,target){
    const before=target.hp;applyProjectileDamage(target,projectile.owner,projectile.damage);const dealt=Math.max(0,before-target.hp);
    if(projectile.element==='earth'&&!target.dead){target.vx=Math.cos(projectile.angle)*target.moveSpeed*2.35;target.vy=Math.sin(projectile.angle)*target.moveSpeed*2.35;target.knockbackUntil=state.time+.72;state.floaters.push({x:target.x,y:target.y-target.radius-8,color:projectile.color,text:'EMPURRADO!',life:.65,maxLife:.65})}
    if(projectile.element==='water'&&dealt>0){const heal=dealt*.7;projectile.owner.hp=Math.min(projectile.owner.maxHp,projectile.owner.hp+heal);state.floaters.push({x:projectile.owner.x,y:projectile.owner.y-projectile.owner.radius-7,color:projectile.color,text:`+${Math.round(heal*10)/10} HP`,life:.72,maxLife:.72})}
    if(projectile.element==='lightning'){
      const chained=state.balls.filter(ball=>ball!==target&&ball!==projectile.owner&&!ball.dead&&!sameCloneFamily(ball,projectile.owner)).sort((a,b)=>Math.hypot(a.x-target.x,a.y-target.y)-Math.hypot(b.x-target.x,b.y-target.y))[0];
      if(chained){applyProjectileDamage(chained,projectile.owner,10);state.projectiles.push({type:'cainChainFx',owner:projectile.owner,x:target.x,y:target.y,fromX:target.x,fromY:target.y,toX:chained.x,toY:chained.y,color:'#ffe34d',life:.32,maxLife:.32});createBurst(chained.x,chained.y,'#ffe34d',14)}
    }
    createBurst(target.x,target.y,projectile.color,22);
  }

  function castKamehameha(goku) {
    const target=nearestEnemy(goku);
    if(!target){goku.nextPowerAt=state.time+1;return}
    const angle=Math.atan2(target.y-goku.y,target.x-goku.x);playCharacterCue('char29','power',{volume:.72,owner:goku});
    state.projectiles.push({type:'kamehameha',owner:goku,x:goku.x,y:goku.y,angle,phase:'charging',chargeLeft:2.5,beamLeft:0,beamWidth:272,damage:balancedDamage('char29',8),ticks:0,nextDamageAt:Infinity,life:4});
    goku.nextPowerAt=state.time+balancedCooldown('char29',11);createBurst(goku.x,goku.y,'#79dfff',22);
    state.floaters.push({x:goku.x,y:goku.y-goku.radius-9,color:'#9cecff',text:'KAMEHAMEHA • CARREGANDO',life:2.2,maxLife:2.2});
  }

  function castCruelSun(escanor) {
    playCharacterCue('char11','power',{volume:.82});
    const radius=Math.max(115.2,state.width*.192);
    state.projectiles.push({type:'cruelSun',owner:escanor,x:state.width/2,y:state.height/2,radius,damage:3,life:6,totalLife:6,nextDamageAt:state.time+.2,rotation:0});
    escanor.nextPowerAt=state.time+14;createBurst(state.width/2,state.height/2,'#ffb52f',38);
    state.floaters.push({x:state.width/2,y:state.height/2-radius-10,color:'#ffd15c',text:'CRUEL SUN',life:1.25,maxLife:1.25});
  }

  function dropBomb(bomberman) {
    state.projectiles.push({type:'bomb',owner:bomberman,x:bomberman.x,y:bomberman.y,radius:25,blastRadius:Math.max(98.4,state.width*.15),damage:16,phase:'fuse',fuseLeft:2,life:2.6,flash:0});
    bomberman.nextPowerAt=state.time+videoCharacterCooldown(bomberman,3.5);playCharacterCue('char12','drop',{volume:.85});createBurst(bomberman.x,bomberman.y,'#ff8ac2',12);
    state.floaters.push({x:bomberman.x,y:bomberman.y-bomberman.radius-8,color:'#ff9bc9',text:'BOMBA!',life:.8,maxLife:.8});
  }

  function releaseHitsugayaIceWave(hitsugaya) {
    const speed=state.width*.42;
    for(let direction=0;direction<8;direction++){const angle=direction*Math.PI/4;state.projectiles.push({type:'iceShard',owner:hitsugaya,x:hitsugaya.x+Math.cos(angle)*(hitsugaya.radius+10),y:hitsugaya.y+Math.sin(angle)*(hitsugaya.radius+10),vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,angle,radius:13,damage:8,life:2.8})}
    createBurst(hitsugaya.x,hitsugaya.y,'#a8efff',38);
  }

  function castIceWings(hitsugaya) {
    playCharacterCue('char13','power',{volume:.78});
    hitsugaya.iceWingsUntil=state.time+4;hitsugaya.hitsugayaSecondWaveAt=state.time+2;
    for(const target of state.balls){if(target===hitsugaya||target.dead||sameCloneFamily(target,hitsugaya))continue;target.iceSlowedUntil=Math.max(target.iceSlowedUntil||0,state.time+4)}
    releaseHitsugayaIceWave(hitsugaya);
    hitsugaya.nextPowerAt=state.time+12;
    state.floaters.push({x:hitsugaya.x,y:hitsugaya.y-hitsugaya.radius-11,color:'#bff6ff',text:'DAIGUREN HYŌRINMARU',life:1.25,maxLife:1.25});
  }

  function activateGodspeed(killua) {
    playCharacterCue('char14','power',{volume:.85});
    killua.killuaActiveUntil=state.time+balancedDuration('char14',5);killua.killuaDamageMultiplier=killua.tier==='video'?.35:.5;killua.killuaComboHits=0;killua.nextPowerAt=state.time+balancedCooldown('char14',12);
    createBurst(killua.x,killua.y,'#a8efff',42);
    state.floaters.push({x:killua.x,y:killua.y-killua.radius-11,color:'#c8f7ff',text:'KANMURU • 500% VELOCIDADE',life:1.35,maxLife:1.35});
  }

  function castHollowPurple(gojo) {
    const target=nearestEnemy(gojo),angle=target?Math.atan2(target.y-gojo.y,target.x-gojo.x):Math.atan2(gojo.vy,gojo.vx),speed=state.width*.42;
    state.projectiles.push({type:'hollowPurple',owner:gojo,x:gojo.x+Math.cos(angle)*(gojo.radius+18),y:gojo.y+Math.sin(angle)*(gojo.radius+18),vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,radius:38,damage:balancedDamage('char30',32),life:3.8,rotation:0,hitIds:new Set()});
    createBurst(gojo.x,gojo.y,'#c66cff',42);
  }

  function selectGojoForceTargets(gojo,limit=2) {
    return state.balls.filter(target=>target!==gojo&&!target.dead&&!sameCloneFamily(target,gojo)).sort((a,b)=>Math.hypot(a.x-gojo.x,a.y-gojo.y)-Math.hypot(b.x-gojo.x,b.y-gojo.y)).slice(0,limit).map(target=>target.id);
  }

  function advanceGojoCycle(gojo) {
    gojo.gojoCycleIndex=(gojo.gojoCycleIndex+1)%3;gojo.nextPowerAt=state.time+balancedCooldown('char30',5);
    if(gojo.gojoCycleIndex===0){gojo.gojoMode='blue';gojo.gojoForceTargetIds=new Set(selectGojoForceTargets(gojo));gojo.gojoActiveUntil=state.time+balancedDuration('char30',3);playCharacterCue('char30','blue',{volume:.78,owner:gojo});createBurst(gojo.x,gojo.y,'#3aaeff',34);state.floaters.push({x:gojo.x,y:gojo.y-gojo.radius-10,color:'#69c8ff',text:'AZUL • 2 ALVOS',life:1.1,maxLife:1.1});return}
    if(gojo.gojoCycleIndex===1){gojo.gojoMode='red';gojo.gojoForceTargetIds=new Set(selectGojoForceTargets(gojo));gojo.gojoActiveUntil=state.time+balancedDuration('char30',3);playCharacterCue('char30','red',{volume:.78,owner:gojo});createBurst(gojo.x,gojo.y,'#ff416d',38);state.floaters.push({x:gojo.x,y:gojo.y-gojo.radius-10,color:'#ff6a8c',text:'VERMELHO • 2 ALVOS',life:1.1,maxLife:1.1});return}
    gojo.gojoForceTargetIds.clear();gojo.gojoMode='purpleCharging';gojo.gojoPurpleCharging=true;gojo.gojoPurpleReleaseAt=state.time+2;gojo.gojoActiveUntil=gojo.gojoPurpleReleaseAt;playCharacterCue('char30','purple',{volume:.78,owner:gojo});createBurst(gojo.x,gojo.y,'#a955ff',28);state.floaters.push({x:gojo.x,y:gojo.y-gojo.radius-10,color:'#d18cff',text:'MURASAKI • CARREGANDO',life:1.4,maxLife:1.4});
  }

  function releaseGojoPurple(gojo) {
    if(!gojo.gojoPurpleCharging||gojo.dead)return;gojo.gojoPurpleCharging=false;gojo.gojoPurpleReleaseAt=Infinity;gojo.gojoMode='purple';gojo.gojoActiveUntil=state.time+1;castHollowPurple(gojo);createBurst(gojo.x,gojo.y,'#e1a0ff',48);state.floaters.push({x:gojo.x,y:gojo.y-gojo.radius-10,color:'#e6b1ff',text:'VAZIO ROXO!',life:1.1,maxLife:1.1});
  }

  function updateGojoPowers(dt) {
    for(const gojo of state.balls){
      if(gojo.dead||gojo.character!=='char30'||!gojoModeActive(gojo,gojo.gojoMode)||(gojo.gojoMode!=='blue'&&gojo.gojoMode!=='red'))continue;
      const repel=gojo.gojoMode==='red';
      for(const target of state.balls){
        if(target===gojo||target.dead||sameCloneFamily(target,gojo)||!gojo.gojoForceTargetIds.has(target.id))continue;
        const dx=repel?target.x-gojo.x:gojo.x-target.x,dy=repel?target.y-gojo.y:gojo.y-target.y,distance=Math.hypot(dx,dy)||1,currentSpeed=Math.hypot(target.vx,target.vy)||target.moveSpeed,strength=target.moveSpeed*dt*(repel?6.5:2.8);
        target.vx+=dx/distance*strength;target.vy+=dy/distance*strength;const redirectedSpeed=Math.hypot(target.vx,target.vy)||1;target.vx=target.vx/redirectedSpeed*currentSpeed;target.vy=target.vy/redirectedSpeed*currentSpeed;
        if(repel&&distance<gojo.radius*2.5){target.x+=dx/distance*target.moveSpeed*dt*.55;target.y+=dy/distance*target.moveSpeed*dt*.55}
      }
    }
  }

  function pointSegmentDistance(px,py,x1,y1,x2,y2) {
    const dx=x2-x1,dy=y2-y1,lengthSquared=dx*dx+dy*dy;
    if(!lengthSquared)return Math.hypot(px-x1,py-y1);
    const t=Math.max(0,Math.min(1,((px-x1)*dx+(py-y1)*dy)/lengthSquared));
    return Math.hypot(px-(x1+dx*t),py-(y1+dy*t));
  }

  function updateCompanions(dt) {
    const bounds=arenaBounds();
    state.companions=state.companions.filter(companion=>!companion.owner.dead&&state.balls.includes(companion.owner)&&(companion.type!=='sungShadow'||companion.life>0));
    for(const companion of state.companions){
      if(companion.type==='sungShadow'){
        companion.life-=dt;const target=nearestSungShadowTarget(companion);if(target){const dx=target.x-companion.x,dy=target.y-companion.y,distance=Math.hypot(dx,dy)||1,currentSpeed=Math.hypot(companion.vx,companion.vy)||companion.moveSpeed,turn=Math.min(1,dt*4.8),blendX=companion.vx/currentSpeed*(1-turn)+dx/distance*turn,blendY=companion.vy/currentSpeed*(1-turn)+dy/distance*turn,blendLength=Math.hypot(blendX,blendY)||1;companion.vx=blendX/blendLength*companion.moveSpeed;companion.vy=blendY/blendLength*companion.moveSpeed}companion.x+=companion.vx*dt;companion.y+=companion.vy*dt;companion.rotation+=companion.moveSpeed*dt/companion.radius;const minX=bounds.left+companion.radius,maxX=bounds.right-companion.radius,minY=bounds.top+companion.radius,maxY=bounds.bottom-companion.radius;if(companion.x<minX||companion.x>maxX){companion.x=Math.max(minX,Math.min(maxX,companion.x));companion.vx*=-1}if(companion.y<minY||companion.y>maxY){companion.y=Math.max(minY,Math.min(maxY,companion.y));companion.vy*=-1}if(state.time>=companion.nextHitAt){for(const enemy of state.balls){if(enemy===companion.owner||enemy.dead||sameCloneFamily(enemy,companion.owner)||thorfinnPhased(enemy)||subaruIntangible(enemy)||genosCritical(enemy))continue;if(Math.hypot(enemy.x-companion.x,enemy.y-companion.y)<=enemy.radius+companion.radius*.75){applyProjectileDamage(enemy,companion.owner,4);enemy.kiritoSlashUntil=state.time+.55;enemy.kiritoSlashSeed=Math.random()*Math.PI*2;companion.nextHitAt=state.time+.75;createBurst(enemy.x,enemy.y,'#637bff',14);break}}}continue;
      }
      if(companion.type==='soccerBall'){
        const currentSpeed=companion.baseMoveSpeed*(state.time<companion.boostUntil?3:1);keepConstantSpeed(companion,currentSpeed);companion.x+=companion.vx*dt;companion.y+=companion.vy*dt;companion.rotation+=currentSpeed*dt/companion.radius;
        if(companion.x<bounds.left+companion.radius||companion.x>bounds.right-companion.radius){companion.x=Math.max(bounds.left+companion.radius,Math.min(bounds.right-companion.radius,companion.x));companion.vx*=-1}
        if(companion.y<bounds.top+companion.radius||companion.y>bounds.bottom-companion.radius){companion.y=Math.max(bounds.top+companion.radius,Math.min(bounds.bottom-companion.radius,companion.y));companion.vy*=-1}
        for(const target of state.balls){if(target.dead)continue;const dx=companion.x-target.x,dy=companion.y-target.y,distance=Math.hypot(dx,dy)||.001,minDistance=companion.radius+target.radius;if(distance>=minDistance)continue;const nx=dx/distance,ny=dy/distance,overlap=minDistance-distance;companion.x+=nx*(overlap+1);companion.y+=ny*(overlap+1);const relative=(companion.vx-target.vx)*nx+(companion.vy-target.vy)*ny;if(relative<0){companion.vx-=2*relative*nx;companion.vy-=2*relative*ny}const cooldownKey=`soccer:${companion.id}:${target.id}`;if((state.contactCooldowns.get(cooldownKey)||0)>state.time)continue;if(target===companion.owner){companion.boostUntil=state.time+4;keepConstantSpeed(companion,companion.baseMoveSpeed*3);if(state.time>=(companion.owner.isagiAudioReadyAt||0)){playCharacterCue('char15','power',{volume:.78,owner:companion.owner});companion.owner.isagiAudioReadyAt=state.time+2.5}createBurst(companion.x,companion.y,'#5ba6ff',22);state.floaters.push({x:companion.x,y:companion.y-companion.radius-7,color:'#9bc7ff',text:'CHUTE • 300%',life:.9,maxLife:.9})}else{applyProjectileDamage(target,companion.owner,10);createBurst(companion.x,companion.y,'#eaf5ff',10)}state.contactCooldowns.set(cooldownKey,state.time+.45)}
        keepConstantSpeed(companion,companion.baseMoveSpeed*(state.time<companion.boostUntil?3:1));continue;
      }
      const al=companion;al.x+=al.vx*dt;al.y+=al.vy*dt;al.rotation+=al.moveSpeed*dt/al.radius;
      if(al.x<bounds.left+al.radius||al.x>bounds.right-al.radius){al.x=Math.max(bounds.left+al.radius,Math.min(bounds.right-al.radius,al.x));al.vx*=-1}
      if(al.y<bounds.top+al.radius||al.y>bounds.bottom-al.radius){al.y=Math.max(bounds.top+al.radius,Math.min(bounds.bottom-al.radius,al.y));al.vy*=-1}
      const speed=Math.hypot(al.vx,al.vy)||1;al.vx=al.vx/speed*al.moveSpeed;al.vy=al.vy/speed*al.moveSpeed;
      if(state.time>=al.activeUntil||state.time<al.nextDamageAt)continue;
      for(const target of state.balls){
        if(target===al.owner||target.dead||sameCloneFamily(target,al.owner))continue;
        if(pointSegmentDistance(target.x,target.y,al.owner.x,al.owner.y,al.x,al.y)<=target.radius+14)applyProjectileDamage(target,al.owner,4);
      }
      al.nextDamageAt=state.time+.5;
    }
  }

  function spawnNarutoClone(naruto) {
    const activeClones=state.balls.filter(ball=>ball.isClone&&!ball.dead&&ball.cloneFamilyId===naruto.cloneFamilyId).sort((a,b)=>a.cloneCreatedAt-b.cloneCreatedAt);
    if(activeClones.length>=MAX_NARUTO_CLONES){const oldest=activeClones[0];oldest.dead=true;stopCharacterAudio(oldest);state.projectiles=state.projectiles.filter(projectile=>projectile.owner!==oldest);createBurst(oldest.x,oldest.y,'#b7efff',18)}
    const position=findFreePosition(naruto.radius),angle=Math.atan2(naruto.vy,naruto.vx)+(Math.random()-.5)*.7,id=state.nextId++;
    const clone={...naruto,id,x:position.x,y:position.y,vx:Math.cos(angle)*naruto.moveSpeed,vy:Math.sin(angle)*naruto.moveSpeed,hp:naruto.hp,isClone:true,cloneFamilyId:naruto.cloneFamilyId,cloneCreatedAt:state.time,nextCloneAt:Infinity,dead:false};
    state.balls.push(clone);stopCharacterAudio(naruto);playCharacterCue('char25','clone',{volume:.72,owner:naruto});createBurst(clone.x,clone.y,'#b7efff',28);state.floaters.push({x:clone.x,y:clone.y-clone.radius-8,color:'#b7efff',text:'KAGE BUNSHIN',life:1.1,maxLife:1.1});
  }

  function updateNarutoClones() {
    for(const naruto of [...state.balls]){if(naruto.dead||naruto.isClone||naruto.character!=='char25'||state.time<naruto.nextCloneAt)continue;spawnNarutoClone(naruto);naruto.nextCloneAt=state.time+11}
  }

  function applyProjectileDamage(target,owner,damage) {
    if(target.dead)return;const dealt=Math.min(target.hp,adjustedDamage(target,outgoingDamage(owner,videoAbilityDamage(owner,damage))));target.hp-=dealt;awardDamage(owner,dealt);addDamageFloater(target,dealt);createBurst(target.x,target.y,'#ff263f',24);
    if(target.hp<=0)eliminateBall(target,owner);renderRanking();
  }

  function updateChainsawPowers() {
    for(const denji of state.balls){
      if(denji.dead||denji.character!=='char23')continue;
      denji.sawActive=true;if(state.time>=(denji.denjiNextSoundAt||0)){playCharacterCue('char23','power',{volume:.34});denji.denjiNextSoundAt=state.time+6.5}
      const damageRadius=denji.radius*2.37;
      for(const target of state.balls){
        if(target===denji||target.dead||Math.hypot(target.x-denji.x,target.y-denji.y)>damageRadius+target.radius)continue;
        const cooldownKey=`saw:${denji.id}:${target.id}`;
        if((state.contactCooldowns.get(cooldownKey)||0)>state.time)continue;
        applyProjectileDamage(target,denji,5.1);state.contactCooldowns.set(cooldownKey,state.time+.45);
      }
    }
  }

  function setErenForm(eren,form) {
    eren.erenForm=form;eren.radius=form===2?eren.baseRadius*1.35:eren.baseRadius;eren.moveSpeed=form===2?eren.baseMoveSpeed*2:form===3?eren.baseMoveSpeed*.58:eren.baseMoveSpeed;if(form===2)playCharacterCue('char24','power',{volume:.82});keepConstantSpeed(eren);eren.x=Math.max(eren.radius,Math.min(state.width-eren.radius,eren.x));eren.y=Math.max(eren.radius,Math.min(state.height-eren.radius,eren.y));eren.nextErenFormAt=state.time+(form===1?10:form===2?8:5);
    const color=form===2?'#ff9b52':form===3?'#66ffa8':'#65d7ff',label=form===2?'FORMA TITÃ':form===3?'REGENERAÇÃO':'FORMA HUMANA';createBurst(eren.x,eren.y,color,form===2?38:24);state.floaters.push({x:eren.x,y:eren.y-eren.radius-8,color,text:label,life:1.15,maxLife:1.15});
  }

  function updateErenForms(dt) {
    for(const eren of state.balls){if(eren.dead||eren.character!=='char24')continue;if(state.time>=eren.nextErenFormAt)setErenForm(eren,eren.erenForm===1?2:eren.erenForm===2?3:1);if(eren.erenForm===3&&eren.hp<eren.maxHp)eren.hp=Math.min(eren.maxHp,eren.hp+4*dt)}
  }

  function repelProjectileFromRedGojo(projectile) {
    if(typeof projectile.x!=='number'||typeof projectile.y!=='number')return;
    for(const gojo of state.balls){
      if(gojo===projectile.owner||gojo.dead||!gojoModeActive(gojo,'red'))continue;
      projectile.repelledBy=projectile.repelledBy||new Set();if(projectile.repelledBy.has(gojo.id))continue;
      const dx=projectile.x-gojo.x,dy=projectile.y-gojo.y,distance=Math.hypot(dx,dy)||1,threshold=gojo.radius+(projectile.radius||12)+24;if(distance>threshold)continue;
      if(projectile.type==='gomuFist')projectile.phase='returning';
      else if(typeof projectile.vx==='number'&&typeof projectile.vy==='number'){
        const speed=Math.hypot(projectile.vx,projectile.vy)||state.width*.4;projectile.vx=dx/distance*speed;projectile.vy=dy/distance*speed;if(typeof projectile.angle==='number')projectile.angle=Math.atan2(projectile.vy,projectile.vx);
        if(projectile.type==='rasenShuriken'&&projectile.phase==='flying'){projectile.targetX=projectile.x+dx/distance*state.width;projectile.targetY=projectile.y+dy/distance*state.height}
      }else continue;
      projectile.repelledBy.add(gojo.id);createBurst(projectile.x,projectile.y,'#ff5278',16);state.floaters.push({x:gojo.x,y:gojo.y-gojo.radius-9,color:'#ff6a8c',text:'REPELIDO',life:.65,maxLife:.65});
    }
  }

  function updateProjectiles(dt) {
    const bounds=arenaBounds();
    for(let index=state.projectiles.length-1;index>=0;index--){
      const projectile=state.projectiles[index];projectile.life-=dt;
      if(projectile.type==='genosExplosion'){if(projectile.life<=0)state.projectiles.splice(index,1);continue}
      if(projectile.owner.dead||!state.balls.includes(projectile.owner)){state.projectiles.splice(index,1);continue}
      if(projectile.type!=='cainElementOrb'||projectile.phase!=='orbit')repelProjectileFromRedGojo(projectile);
      if(projectile.type==='genosIncinerator'){if(projectile.life<=0)state.projectiles.splice(index,1);continue}
      if(projectile.type==='minatoFlashTrail'){if(projectile.life<=0)state.projectiles.splice(index,1);continue}
      if(projectile.type==='minatoKunai'){
        const margin=projectile.owner.radius+5;projectile.targetX=Math.max(bounds.left+margin,Math.min(bounds.right-margin,projectile.targetX));projectile.targetY=Math.max(bounds.top+margin,Math.min(bounds.bottom-margin,projectile.targetY));
        if(projectile.phase==='flying'){const dx=projectile.targetX-projectile.x,dy=projectile.targetY-projectile.y,distance=Math.hypot(dx,dy),speed=Math.hypot(projectile.vx,projectile.vy),step=speed*dt;if(distance<=step){projectile.x=projectile.targetX;projectile.y=projectile.targetY;projectile.vx=0;projectile.vy=0;projectile.phase='stuck';projectile.angle+=Math.PI*.5;createBurst(projectile.x,projectile.y,'#ffe36b',10)}else{projectile.vx=dx/distance*speed;projectile.vy=dy/distance*speed;projectile.angle=Math.atan2(dy,dx);projectile.x+=projectile.vx*dt;projectile.y+=projectile.vy*dt}}
        else{projectile.x=Math.max(bounds.left+margin,Math.min(bounds.right-margin,projectile.x));projectile.y=Math.max(bounds.top+margin,Math.min(bounds.bottom-margin,projectile.y))}
        if(projectile.life<=0)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='cainChainFx'){if(projectile.life<=0)state.projectiles.splice(index,1);continue}
      if(projectile.type==='cainElementOrb'){
        if(projectile.phase==='orbit'){projectile.orbitAngle+=dt*1.65;projectile.x=projectile.owner.x+Math.cos(projectile.orbitAngle)*projectile.orbitDistance;projectile.y=projectile.owner.y+Math.sin(projectile.orbitAngle)*projectile.orbitDistance;projectile.life=999;continue}
        projectile.x+=projectile.vx*dt;projectile.y+=projectile.vy*dt;projectile.angle=Math.atan2(projectile.vy,projectile.vx);
        let consumed=false;for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner)||projectile.hitIds.has(ball.id)||thorfinnPhased(ball))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)>ball.radius+projectile.radius*.8)continue;projectile.hitIds.add(ball.id);strikeCainOrb(projectile,ball);if(projectile.element!=='light'){consumed=true;break}}
        const outside=projectile.x<bounds.left-projectile.radius||projectile.x>bounds.right+projectile.radius||projectile.y<bounds.top-projectile.radius||projectile.y>bounds.bottom+projectile.radius;
        if(consumed||outside||projectile.life<=0)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='shadowPossession'){
        if(projectile.phase==='bound'){
          const target=projectile.boundTarget;if(!target||target.dead){state.projectiles.splice(index,1);continue}projectile.x=target.x;projectile.y=target.y;target.shadowBindUntil=state.time+.08;target.vx=0;target.vy=0;
        }else{
          projectile.x+=projectile.vx*dt;projectile.y+=projectile.vy*dt;projectile.trailPoints.push({x:projectile.x,y:projectile.y});if(projectile.trailPoints.length>22)projectile.trailPoints.shift();
          for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner)||thorfinnPhased(ball))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)>ball.radius+projectile.radius)continue;projectile.phase='bound';projectile.boundTarget=ball;projectile.life=2.2;ball.shadowBindUntil=state.time+2.2;ball.vx=0;ball.vy=0;applyProjectileDamage(ball,projectile.owner,projectile.damage);createBurst(ball.x,ball.y,'#1c1725',24);state.floaters.push({x:ball.x,y:ball.y-ball.radius-8,color:'#b8d38d',text:'SOMBRA PRESA • 2.2s',life:1,maxLife:1});break}
        }
        if(projectile.life<=0||projectile.x<-50||projectile.x>state.width+50||projectile.y<-50||projectile.y>state.height+50)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='namiThunderBubble'){
        projectile.rotation+=dt*.7;projectile.flash=Math.max(0,projectile.flash-dt*3.5);for(const bolt of projectile.bolts)bolt.life-=dt;projectile.bolts=projectile.bolts.filter(bolt=>bolt.life>0);
        if(projectile.phase==='flying'){
          if(projectile.target&&!projectile.target.dead){projectile.targetX=projectile.target.x;projectile.targetY=projectile.target.y}const dx=projectile.targetX-projectile.x,dy=projectile.targetY-projectile.y,distance=Math.hypot(dx,dy)||1,speed=Math.hypot(projectile.vx,projectile.vy)||state.width*.48,turn=Math.min(1,dt*5.2),desiredX=dx/distance,desiredY=dy/distance,currentX=projectile.vx/speed,currentY=projectile.vy/speed,blendedX=currentX*(1-turn)+desiredX*turn,blendedY=currentY*(1-turn)+desiredY*turn,blendedLength=Math.hypot(blendedX,blendedY)||1;projectile.vx=blendedX/blendedLength*speed;projectile.vy=blendedY/blendedLength*speed;const step=speed*dt;if(distance<=step+projectile.radius*.18){projectile.x=projectile.targetX;projectile.y=projectile.targetY;projectile.phase='storm';projectile.life=5;createBurst(projectile.x,projectile.y,'#9beaff',24);strikeNamiThunderBubble(projectile)}else{projectile.x+=projectile.vx*dt;projectile.y+=projectile.vy*dt}
        }else if(state.time>=projectile.nextStrikeAt)strikeNamiThunderBubble(projectile);
        if(projectile.life<=0)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='subaruShadow'){
        if(!projectile.target||projectile.target.dead||thorfinnPhased(projectile.target)||subaruIntangible(projectile.target)||projectile.hitIds.has(projectile.target.id))projectile.target=nearestShadowTarget(projectile);if(projectile.target){const desiredX=projectile.target.x-projectile.x,desiredY=projectile.target.y-projectile.y,distance=Math.hypot(desiredX,desiredY)||1,speed=Math.hypot(projectile.vx,projectile.vy)||state.width*.34,turn=Math.min(1,dt*5.8),blendedX=projectile.vx/speed*(1-turn)+desiredX/distance*turn,blendedY=projectile.vy/speed*(1-turn)+desiredY/distance*turn,blendedLength=Math.hypot(blendedX,blendedY)||1;projectile.vx=blendedX/blendedLength*speed;projectile.vy=blendedY/blendedLength*speed;projectile.angle=Math.atan2(projectile.vy,projectile.vx)}projectile.x+=projectile.vx*dt;projectile.y+=projectile.vy*dt;projectile.rotation+=dt*4;if(state.time>=projectile.nextTrailAt){projectile.trailPoints.push({x:projectile.x,y:projectile.y});if(projectile.trailPoints.length>18)projectile.trailPoints.shift();projectile.nextTrailAt=state.time+.045}for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner)||thorfinnPhased(ball)||subaruIntangible(ball)||projectile.hitIds.has(ball.id))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<=ball.radius+projectile.radius*.7){projectile.hitIds.add(ball.id);applyProjectileDamage(ball,projectile.owner,projectile.damage);healSubaruFromShadow(projectile.owner);ball.shadowSlowedUntil=state.time+3;projectile.target=nearestShadowTarget(projectile);createBurst(ball.x,ball.y,'#5c327c',18);state.floaters.push({x:ball.x,y:ball.y-ball.radius-7,color:'#bd88e2',text:'MÃOS SOMBRIAS • LENTO',life:.85,maxLife:.85})}}
        if(projectile.life<=0||projectile.x<-80||projectile.x>state.width+80||projectile.y<-80||projectile.y>state.height+80)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='yorKnife'){
        projectile.x+=projectile.vx*dt;projectile.y+=projectile.vy*dt;projectile.rotation+=dt*10;let hit=false;for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<=ball.radius+projectile.radius*.7){applyProjectileDamage(ball,projectile.owner,projectile.damage);createBurst(projectile.x,projectile.y,'#f1cf5b',15);hit=true;break}}
        if(hit||projectile.life<=0||projectile.x<-55||projectile.x>state.width+55||projectile.y<-55||projectile.y>state.height+55)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='singedPoison'){
        projectile.rotation+=dt*.28;if(state.time%1<dt)createBurst(projectile.x,projectile.y,'#70dc61',2);for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner)||thorfinnPhased(ball))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)>projectile.radius+ball.radius*.55)continue;const cooldownKey=`poison:${projectile.owner.id}:${ball.id}`;if((state.contactCooldowns.get(cooldownKey)||0)>state.time)continue;applyProjectileDamage(ball,projectile.owner,projectile.damage);ball.poisonSource=projectile.owner;ball.poisonedUntil=state.time+2.2;if(!ball.poisonNextDamageAt||ball.poisonNextDamageAt<=state.time)ball.poisonNextDamageAt=state.time+.5;state.contactCooldowns.set(cooldownKey,state.time+.65);createBurst(ball.x,ball.y,'#74ef68',8);state.floaters.push({x:ball.x,y:ball.y-ball.radius-5,color:'#93f481',text:'ENVENENADO • 2s',life:.65,maxLife:.65})}
        if(projectile.life<=0)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='meguminExplosion'){
        projectile.rotation+=dt*(projectile.phase==='charging'?1.8:4.5);
        if(projectile.phase==='charging'){
          projectile.chargeLeft-=dt;
          if(projectile.chargeLeft<=0){projectile.phase='blast';projectile.life=1.15;for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<=projectile.radius+ball.radius)applyProjectileDamage(ball,projectile.owner,projectile.damage)}projectile.owner.meguminState='exhausted';projectile.owner.meguminExhaustedUntil=state.time+5;projectile.owner.nextPowerAt=state.time+14.4;createBurst(projectile.x,projectile.y,'#ffcf5b',110);createBurst(projectile.x,projectile.y,'#ff3f36',90);state.floaters.push({x:projectile.x,y:Math.max(30,projectile.y-projectile.radius*.58),color:'#fff0a6',text:'EXPLOSION!',life:1.25,maxLife:1.25})}
        }
        if(projectile.life<=0)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='cruelSun'){
        projectile.x=state.width/2;projectile.y=state.height/2;projectile.rotation+=dt*.35;
        if(state.time>=projectile.nextDamageAt){
          for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<=projectile.radius+ball.radius)applyProjectileDamage(ball,projectile.owner,projectile.damage)}
          const ownerInsideSun=Math.hypot(projectile.owner.x-projectile.x,projectile.owner.y-projectile.y)<=projectile.radius+projectile.owner.radius;
          if(ownerInsideSun){const restored=Math.min(2,projectile.owner.maxHp-projectile.owner.hp);projectile.owner.hp+=restored;if(restored>0){createBurst(projectile.owner.x,projectile.owner.y,'#ffd86b',6);state.floaters.push({x:projectile.owner.x,y:projectile.owner.y-projectile.owner.radius-7,color:'#ffe681',text:`+${Math.round(restored)} HP`,life:.65,maxLife:.65})}}
          projectile.nextDamageAt=state.time+.75;
        }
        if(projectile.life<=0)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='bomb'){
        projectile.flash+=dt;
        if(projectile.phase==='fuse'&&(projectile.fuseLeft-=dt)<=0){projectile.phase='explosion';projectile.life=.55;playCharacterCue('char12','power',{volume:.55});for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<=projectile.blastRadius+ball.radius)applyProjectileDamage(ball,projectile.owner,projectile.damage)}createBurst(projectile.x,projectile.y,'#ffbb45',55);state.floaters.push({x:projectile.x,y:projectile.y-projectile.blastRadius*.55,color:'#ffd56b',text:'BOOM!',life:.75,maxLife:.75})}
        if(projectile.life<=0)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='iceShard'){
        projectile.x+=projectile.vx*dt;projectile.y+=projectile.vy*dt;let hit=false;for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<=ball.radius+projectile.radius*.65){applyProjectileDamage(ball,projectile.owner,projectile.damage);hit=true;break}}
        if(hit||projectile.life<=0||projectile.x<-40||projectile.x>state.width+40||projectile.y<-40||projectile.y>state.height+40)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='stone'){
        projectile.x+=projectile.vx*dt;projectile.y+=projectile.vy*dt;projectile.rotation+=dt*8;let hit=false;for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<=ball.radius+projectile.radius*.72){applyProjectileDamage(ball,projectile.owner,projectile.damage);createBurst(projectile.x,projectile.y,'#bd9a6b',12);hit=true;break}}
        if(hit||projectile.life<=0||projectile.x<-40||projectile.x>state.width+40||projectile.y<-40||projectile.y>state.height+40)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='thunderStorm'){
        projectile.flash=Math.max(0,projectile.flash-dt*4.5);for(const bolt of projectile.bolts)bolt.life-=dt;projectile.bolts=projectile.bolts.filter(bolt=>bolt.life>0);
        if(state.time>=projectile.nextStrikeAt){for(let strike=0;strike<2;strike++){const endX=bounds.left+projectile.strikeRadius+Math.random()*Math.max(1,bounds.right-bounds.left-projectile.strikeRadius*2),endY=bounds.top+projectile.strikeRadius+Math.random()*Math.max(1,bounds.bottom-bounds.top-projectile.strikeRadius*2);projectile.bolts.push(createLightningBolt(projectile.owner.x,projectile.owner.y,endX,endY,projectile.strikeRadius));createBurst(endX,endY,'#ffe86b',12);for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner)||thorfinnPhased(ball))continue;if(Math.hypot(ball.x-endX,ball.y-endY)<=projectile.strikeRadius+ball.radius*.45)applyProjectileDamage(ball,projectile.owner,projectile.damage)}}projectile.nextStrikeAt=state.time+.18;projectile.flash=1}
        if(projectile.life<=0)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='predator'){
        projectile.rotation+=dt*2.7;
        for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<=projectile.radius+ball.radius)ball.predatorSlowedUntil=state.time+.08}
        if(state.time>=projectile.nextDamageAt){
          let healed=0;
          for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<=projectile.radius+ball.radius){const before=ball.hp;applyProjectileDamage(ball,projectile.owner,projectile.damage);healed+=(before-ball.hp)*.35}}
          if(healed>0&&!projectile.owner.dead){const restored=Math.min(healed,projectile.owner.maxHp-projectile.owner.hp);projectile.owner.hp+=restored;if(restored>0){createBurst(projectile.owner.x,projectile.owner.y,'#73f7d0',7);state.floaters.push({x:projectile.owner.x,y:projectile.owner.y-projectile.owner.radius-7,color:'#73f7d0',text:`+${Math.round(restored)} HP`,life:.7,maxLife:.7})}}
          projectile.nextDamageAt=state.time+.5;
        }
        if(projectile.life<=0)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='kamehameha'){
        if(projectile.phase==='charging'){
          projectile.x=projectile.owner.x;projectile.y=projectile.owner.y;projectile.chargeLeft-=dt;
          if(projectile.chargeLeft<=0){projectile.phase='beam';projectile.x=projectile.owner.x;projectile.y=projectile.owner.y;projectile.beamLeft=1;projectile.nextDamageAt=state.time;createBurst(projectile.x,projectile.y,'#d9fbff',38);state.floaters.push({x:projectile.x,y:projectile.y-projectile.owner.radius-10,color:'#c8f8ff',text:'KAMEHAMEHA!',life:1,maxLife:1})}
          continue;
        }
        projectile.beamLeft-=dt;const beamLength=Math.hypot(state.width,state.height)*1.5,endX=projectile.x+Math.cos(projectile.angle)*beamLength,endY=projectile.y+Math.sin(projectile.angle)*beamLength;
        if(state.time>=projectile.nextDamageAt&&projectile.ticks<4){for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner))continue;if(pointSegmentDistance(ball.x,ball.y,projectile.x,projectile.y,endX,endY)<=ball.radius+projectile.beamWidth*.5){applyProjectileDamage(ball,projectile.owner,projectile.damage);createBurst(ball.x,ball.y,'#9cecff',14)}}projectile.ticks+=1;projectile.nextDamageAt=state.time+.25}
        if(projectile.beamLeft<=0)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='hollowPurple'){
        projectile.x+=projectile.vx*dt;projectile.y+=projectile.vy*dt;projectile.rotation+=dt*5.5;
        for(const ball of state.balls){if(ball===projectile.owner||ball.dead||sameCloneFamily(ball,projectile.owner)||projectile.hitIds.has(ball.id))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<=ball.radius+projectile.radius*.72){projectile.hitIds.add(ball.id);applyProjectileDamage(ball,projectile.owner,projectile.damage)}}
        if(projectile.life<=0||projectile.x<-80||projectile.x>state.width+80||projectile.y<-80||projectile.y>state.height+80)state.projectiles.splice(index,1);continue;
      }
      if(projectile.type==='getsuga'){
        projectile.x+=projectile.vx*dt;projectile.y+=projectile.vy*dt;
        for(const ball of state.balls){if(ball.id===projectile.owner.id||ball.dead||sameCloneFamily(ball,projectile.owner)||projectile.hitIds.has(ball.id))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<ball.radius+projectile.radius*.65){projectile.hitIds.add(ball.id);applyProjectileDamage(ball,projectile.owner,projectile.damage)}}
        if(projectile.life<=0||projectile.x<-50||projectile.x>state.width+50||projectile.y<-50||projectile.y>state.height+50)state.projectiles.splice(index,1);
        continue;
      }
      if(projectile.type==='rasenShuriken'){
        projectile.rotation+=dt*(projectile.phase==='flying'?9:5);
        if(projectile.phase==='flying'){
          const dx=projectile.targetX-projectile.x,dy=projectile.targetY-projectile.y,distance=Math.hypot(dx,dy),step=Math.hypot(projectile.vx,projectile.vy)*dt;
          if(distance<=step){projectile.x=projectile.targetX;projectile.y=projectile.targetY;projectile.phase='zone';projectile.life=6;projectile.nextDamageAt=state.time+.5;createBurst(projectile.x,projectile.y,'#55d9ff',34)}else{projectile.x+=projectile.vx*dt;projectile.y+=projectile.vy*dt}
        }else if(state.time>=projectile.nextDamageAt){
          for(const ball of state.balls){if(ball.id===projectile.owner.id||ball.dead||sameCloneFamily(ball,projectile.owner))continue;if(Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<=projectile.zoneRadius+ball.radius)applyProjectileDamage(ball,projectile.owner,projectile.damage)}
          projectile.nextDamageAt=state.time+.5;
        }
        if(projectile.life<=0)state.projectiles.splice(index,1);
        continue;
      }
      if(projectile.phase==='extending'){
        const movementX=projectile.vx*dt,movementY=projectile.vy*dt;projectile.x+=movementX;projectile.y+=movementY;projectile.distance+=Math.hypot(movementX,movementY);
        let bounced=false;
        if(projectile.x<bounds.left+projectile.radius||projectile.x>bounds.right-projectile.radius){projectile.x=Math.max(bounds.left+projectile.radius,Math.min(bounds.right-projectile.radius,projectile.x));projectile.vx*=-1;bounced=true}
        if(projectile.y<bounds.top+projectile.radius||projectile.y>bounds.bottom-projectile.radius){projectile.y=Math.max(bounds.top+projectile.radius,Math.min(bounds.bottom-projectile.radius,projectile.y));projectile.vy*=-1;bounced=true}
        if(bounced){projectile.bounces+=1;projectile.trailPoints.push({x:projectile.x,y:projectile.y});if(projectile.trailPoints.length>32)projectile.trailPoints.shift();createBurst(projectile.x,projectile.y,'#ffc06a',10)}
        let hit=null;for(const ball of state.balls){if(ball.id!==projectile.owner.id&&!ball.dead&&Math.hypot(ball.x-projectile.x,ball.y-projectile.y)<ball.radius+projectile.radius*.72){hit=ball;break}}
        if(hit){applyProjectileDamage(hit,projectile.owner,projectile.damage);projectile.phase='returning';createBurst(projectile.x,projectile.y,'#ffc06a',16)}
      }else{
        const returnTarget=projectile.trailPoints.length?projectile.trailPoints[projectile.trailPoints.length-1]:projectile.owner;
        const dx=returnTarget.x-projectile.x,dy=returnTarget.y-projectile.y,distance=Math.hypot(dx,dy)||1,returnSpeed=state.width*1.44;
        if(distance<Math.max(10,returnSpeed*dt*1.15)){
          projectile.x=returnTarget.x;projectile.y=returnTarget.y;
          if(projectile.trailPoints.length){projectile.trailPoints.pop();continue}
          const arm=projectile.armIndex??0;projectile.owner.luffyArmActive[arm]=false;projectile.owner.luffyArmReadyAt[arm]=state.time+balancedCooldown('char22',10);syncLuffyNextPower(projectile.owner);state.projectiles.splice(index,1);continue;
        }
        projectile.vx=dx/distance*returnSpeed;projectile.vy=dy/distance*returnSpeed;
        projectile.x+=dx/distance*returnSpeed*dt;projectile.y+=dy/distance*returnSpeed*dt;
      }
      if(projectile.life<=0)state.projectiles.splice(index,1);
    }
  }

  function update(dt) {
    state.time+=dt;
    const bounds=arenaBounds();
    updateErenForms(dt);
    updateNarutoClones();
    updateIsagiPowers();
    updateGojoPowers(dt);
    updateRudeusForesight();
    updateThorfinnPowers();
    updateThorfinnVideoVictory();
    updateSubaruPowers();
    updateSingedPowers();
    updatePoisonedBalls();
    updateGenosPowers();
    updateMinatoPowers();
    updateCainPowers();
    updateMetalBatPowers();
    for(const ball of state.balls){
      if(ball.dead)continue;
      if(ball.character==='char9')updateTanjiroWaterWheel(ball,dt);
      if(ball.character==='char13'&&state.time>=ball.hitsugayaSecondWaveAt){ball.hitsugayaSecondWaveAt=Infinity;releaseHitsugayaIceWave(ball);state.floaters.push({x:ball.x,y:ball.y-ball.radius-9,color:'#d9fbff',text:'SEGUNDA ONDA!',life:.8,maxLife:.8})}
      if(ball.character==='char2'&&ball.meguminState==='exhausted'&&state.time>=ball.meguminExhaustedUntil)ball.meguminState='idle';
      if(ball.character==='char16'&&ball.midoriyaState==='charging'){
        ball.vx=0;ball.vy=0;if(state.time>=ball.midoriyaChargeUntil)launchMidoriyaDash(ball);
      }
      if(ball.character==='char16'&&ball.midoriyaState==='dashing'&&state.time>=ball.midoriyaDashUntil)finishMidoriyaDash(ball);
      if(ball.character==='char20'&&ball.saitamaState==='charging'){ball.vx=0;ball.vy=0;if(state.time>=ball.saitamaChargeUntil)releaseSaitamaPunch(ball)}
      let speedFactor=1;if(state.time<(ball.predatorSlowedUntil||0))speedFactor*=.55;if(state.time<(ball.iceSlowedUntil||0))speedFactor*=.65;if(state.time<(ball.shadowSlowedUntil||0))speedFactor*=.5;if(state.time<(ball.knockbackUntil||0))speedFactor*=2;if(ball.character==='char9'&&state.time<(ball.tanjiroWheelUntil||0))speedFactor*=3;if(ball.character==='char14'&&state.time<(ball.killuaActiveUntil||0))speedFactor*=5;if(ball.character==='char16'&&ball.midoriyaState==='dashing')speedFactor*=3;if(ball.character==='char17'&&state.time<(ball.rudeusDodgeUntil||0))speedFactor*=2.2;if(ball.character==='char7'&&ball.genosState==='dashing')speedFactor*=3;if(ball.character==='char7'&&state.time<(ball.genosOverheatedUntil||0))speedFactor*=.6;
      if(kiritoDualBladesActive(ball))speedFactor*=3;
      const geassStopped=state.time<(ball.geassStopUntil||0),shadowBound=state.time<(ball.shadowBindUntil||0),geassRushing=state.time<(ball.geassRushUntil||0);if(geassRushing)speedFactor=8;if(geassStopped||shadowBound){ball.vx=0;ball.vy=0}
      const meguminStopped=ball.character==='char2'&&(ball.meguminState==='charging'||state.time<(ball.meguminExhaustedUntil||0));
      const currentMoveSpeed=geassStopped||shadowBound||meguminStopped||genosCritical(ball)||ball.character==='char16'&&ball.midoriyaState==='charging'||ball.character==='char20'&&ball.saitamaState==='charging'?0:ball.moveSpeed*speedFactor;keepConstantSpeed(ball,currentMoveSpeed);ball.x+=ball.vx*dt;ball.y+=ball.vy*dt;ball.rotation+=currentMoveSpeed*dt/ball.radius;
      let hitWall=false;const minX=bounds.left+ball.radius,maxX=bounds.right-ball.radius,minY=bounds.top+ball.radius,maxY=bounds.bottom-ball.radius;if(ball.x<minX||ball.x>maxX){ball.x=Math.max(minX,Math.min(maxX,ball.x));ball.vx*=-1;hitWall=true}if(ball.y<minY||ball.y>maxY){ball.y=Math.max(minY,Math.min(maxY,ball.y));ball.vy*=-1;hitWall=true}keepConstantSpeed(ball,currentMoveSpeed);if(hitWall&&ball.character==='char1'&&state.time>=ball.zenitsuReadyAt)releaseZenitsuTeleport(ball);
      if(ball.character==='char18'&&state.time>=ball.nextPowerAt)activateKiritoDualBlades(ball);
      if(ball.character==='char19'&&state.time>=ball.nextPowerAt)activateLelouchGeass(ball);
      if(ball.character==='char20'&&state.time>=ball.nextPowerAt)activateSaitamaPunch(ball);
      if(ball.character==='char30'&&ball.gojoPurpleCharging&&state.time>=ball.gojoPurpleReleaseAt)releaseGojoPurple(ball);
      if(ball.character==='char26'&&ball.pikachuCharging&&state.time>=ball.pikachuStormReleaseAt)castThunderStorm(ball);
      if(state.time>=ball.nextPowerAt){if(ball.character==='char2')castMeguminExplosion(ball);else if(ball.character==='char3')throwYorKnives(ball);else if(ball.character==='char7')startGenosDash(ball);else if(ball.character==='char8')activateSungShadowStep(ball);else if(ball.character==='char9')activateTanjiroWaterWheel(ball);else if(ball.character==='char11')castCruelSun(ball);else if(ball.character==='char12')dropBomb(ball);else if(ball.character==='char13')castIceWings(ball);else if(ball.character==='char14')activateGodspeed(ball);else if(ball.character==='char16')startMidoriyaCharge(ball);else if(ball.character==='char17')activateRudeusForesight(ball);else if(ball.character==='char21')castGetsuga(ball);else if(ball.character==='char22')castGomuPunches(ball);else if(ball.character==='char25')castRasenShuriken(ball);else if(ball.character==='char26')startPikachuCharge(ball);else if(ball.character==='char27')castAlchemyLink(ball);else if(ball.character==='char28')castPredator(ball);else if(ball.character==='char29')castKamehameha(ball);else if(ball.character==='char30')advanceGojoCycle(ball);else if(ball.character==='char31')castShadowPossession(ball);else if(ball.character==='char32')castNamiThunderBubble(ball);else if(ball.character==='char33')castMinatoHiraishin(ball);else if(ball.character==='char34')chargeCainElement(ball);else if(ball.character==='char35')castMetalBatSwing(ball)}
    }
    for(let i=0;i<state.balls.length;i++)for(let j=i+1;j<state.balls.length;j++)resolveCollision(state.balls[i],state.balls[j]);
    updateChainsawPowers();
    updateCompanions(dt);
    updateProjectiles(dt);
    for(let i=state.particles.length-1;i>=0;i--){const p=state.particles[i];p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.97;p.vy*=.97;p.life-=dt;if(p.life<=0)state.particles.splice(i,1)}
    for(let i=state.floaters.length-1;i>=0;i--){const floater=state.floaters[i];floater.y-=24*dt;floater.life-=dt;if(floater.life<=0)state.floaters.splice(i,1)}
    if(state.balls.some(ball=>ball.dead)){state.balls=state.balls.filter(ball=>!ball.dead);syncUi();while(playerBallCount()<MAX_BALLS&&state.queue.length&&!liveEntryInProgress)promoteNextPlayer();checkVideoBattleEnd()}
  }

  function drawBackground() {
    ctx.fillStyle='#080916';ctx.fillRect(0,0,state.width,state.height);const glow=ctx.createRadialGradient(state.width/2,state.height/2,0,state.width/2,state.height/2,state.width*.7);glow.addColorStop(0,'rgba(40,29,97,.28)');glow.addColorStop(1,'rgba(3,5,15,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,state.width,state.height);
    ctx.strokeStyle='rgba(102,116,181,.09)';ctx.lineWidth=1;const grid=state.width/10;for(let p=grid;p<state.width;p+=grid){ctx.beginPath();ctx.moveTo(p,0);ctx.lineTo(p,state.height);ctx.stroke();ctx.beginPath();ctx.moveTo(0,p);ctx.lineTo(state.width,p);ctx.stroke()}ctx.strokeStyle='rgba(52,244,255,.07)';ctx.beginPath();ctx.arc(state.width/2,state.height/2,state.width*.18,0,Math.PI*2);ctx.stroke();
    const bounds=arenaBounds();if(bounds.progress>0){ctx.save();ctx.fillStyle='rgba(2,3,11,.82)';ctx.fillRect(0,0,state.width,bounds.top);ctx.fillRect(0,bounds.bottom,state.width,state.height-bounds.bottom);ctx.fillRect(0,bounds.top,bounds.left,bounds.bottom-bounds.top);ctx.fillRect(bounds.right,bounds.top,state.width-bounds.right,bounds.bottom-bounds.top);ctx.strokeStyle=`rgba(255,76,91,${.65+bounds.progress*.3})`;ctx.lineWidth=3;ctx.shadowColor='#ff304e';ctx.shadowBlur=14;ctx.strokeRect(bounds.left,bounds.top,bounds.right-bounds.left,bounds.bottom-bounds.top);ctx.shadowBlur=0;ctx.fillStyle='rgba(255,105,114,.9)';ctx.textAlign='center';ctx.textBaseline='top';ctx.font=`800 ${Math.max(8,state.width*.014)}px Chakra Petch`;ctx.fillText(bounds.progress<1?'ARENA FECHANDO':'LIMITE FINAL',state.width/2,bounds.top+7);ctx.restore()}
  }

  function drawTestDummy(ball) {
    ctx.save();ctx.translate(ball.x,ball.y);ctx.fillStyle='#25283a';ctx.strokeStyle='#ffe278';ctx.lineWidth=2.4;ctx.shadowColor='#ffd84d';ctx.shadowBlur=10;ctx.beginPath();ctx.arc(0,0,ball.radius*.67,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.shadowBlur=0;ctx.fillStyle='#ffe278';ctx.beginPath();ctx.arc(0,-ball.radius*.18,ball.radius*.19,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#ffe278';ctx.lineWidth=Math.max(3,ball.radius*.1);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,ball.radius*.04);ctx.lineTo(0,ball.radius*.38);ctx.moveTo(-ball.radius*.28,ball.radius*.13);ctx.lineTo(ball.radius*.28,ball.radius*.13);ctx.moveTo(0,ball.radius*.38);ctx.lineTo(-ball.radius*.2,ball.radius*.57);ctx.moveTo(0,ball.radius*.38);ctx.lineTo(ball.radius*.2,ball.radius*.57);ctx.stroke();ctx.restore();
  }

  function drawCircularPortrait(image,sourceX,sourceY,sourceSize,radius,ringColor,imageScale=.82) {
    const imageRadius=radius*imageScale;ctx.save();ctx.beginPath();ctx.arc(0,0,radius*.82,0,Math.PI*2);ctx.clip();ctx.drawImage(image,sourceX,sourceY,sourceSize,sourceSize,-imageRadius,-imageRadius,imageRadius*2,imageRadius*2);const shade=ctx.createRadialGradient(0,0,radius*.44,0,0,radius*.84);shade.addColorStop(0,'rgba(0,0,0,0)');shade.addColorStop(1,'rgba(0,0,0,.5)');ctx.fillStyle=shade;ctx.fillRect(-radius,-radius,radius*2,radius*2);ctx.restore();ctx.strokeStyle=ringColor;ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,radius*.84,0,Math.PI*2);ctx.stroke();
  }

  const directPortraitRings={char11:'#ffbd42',char12:'#ff8ac2',char13:'#9cecff',char14:'#91dcff',char15:'#77a9ff',char16:'#62f5ba',char21:'#ff344f',char22:'#ffc44a',char23:'#c7cdd5',char24:'#65d7ff',char25:'#55d9ff',char26:'#ffe342',char27:'#e6bd4e',char28:'#9cecff',char29:'#ffd45e',char30:'#c7a7ff',char31:'#b6d68d',char32:'#75e1ff',char33:'#ffe36b',char34:'#c8b7ff',char35:'#ff765f'};

  function characterPortraitSpec(character,erenForm=1) {
    if(character==='char1')return{image:zenitsuImage,x:98,y:100,size:220};
    if(character==='char2')return{image:meguminImage,x:188,y:38,size:205};
    if(character==='char3')return{image:yorImage,x:50,y:28,size:230};
    if(character==='char4')return{image:thorfinnImage,x:150,y:55,size:300};
    if(character==='char5')return{image:singedImage,x:43,y:0,size:140};
    if(character==='char6')return{image:subaruImage,x:270,y:250,size:1200};
    if(character==='char7')return{image:genosImage,x:145,y:5,size:250};
    if(character==='char8')return{image:sungImage,x:390,y:20,size:500};
    if(character==='char9')return{image:tanjiroImage,x:72,y:4,size:410};
    if(character==='char10')return{image:itadoriImage,x:425,y:0,size:570};
    if(character==='char11')return{image:escanorImage,x:390,y:40,size:340};
    if(character==='char12')return{image:bombermanImage,x:175,y:0,size:461};
    if(character==='char13')return{image:hitsugayaImage,x:72,y:95,size:280};
    if(character==='char14')return{image:killuaImage,x:111,y:0,size:289};
    if(character==='char15')return{image:isagiImage,x:162,y:0,size:414};
    if(character==='char16')return{image:midoriyaImage,x:285,y:270,size:410};
    if(character==='char17')return{image:rudeusImage,x:73,y:25,size:410};
    if(character==='char18')return{image:kiritoImage,x:195,y:30,size:390};
    if(character==='char19')return{image:lelouchImage,x:165,y:0,size:405};
    if(character==='char20')return{image:saitamaImage,x:165,y:20,size:440};
    if(character==='char21'){const size=Math.min(ichigoImage.naturalWidth||1,ichigoImage.naturalHeight||1);return{image:ichigoImage,x:((ichigoImage.naturalWidth||size)-size)/2,y:((ichigoImage.naturalHeight||size)-size)/2,size}}
    if(character==='char22')return{image:luffyImage,x:22,y:105,size:330,scale:.8};
    if(character==='char23')return{image:denjiImage,x:285,y:0,size:155};
    if(character==='char24'){const crops=[{x:20,y:190,size:600},{x:590,y:20,size:400},{x:330,y:55,size:340}],crop=crops[Math.max(0,Math.min(2,erenForm-1))];return{image:erenImages[Math.max(0,Math.min(2,erenForm-1))],...crop}}
    if(character==='char25')return{image:narutoImage,x:50,y:0,size:520};
    if(character==='char26')return{image:pikachuImage,x:440,y:80,size:520};
    if(character==='char27')return{image:edwardImage,x:250,y:130,size:640};
    if(character==='char28')return{image:rimuruImage,x:650,y:20,size:650};
    if(character==='char29')return{image:gokuImage,x:80,y:0,size:640};
    if(character==='char30')return{image:gojoImage,x:70,y:170,size:580};
    if(character==='char31')return{image:shikamaruImage,x:120,y:120,size:480};
    if(character==='char32')return{image:namiImage,x:270,y:390,size:440};
    if(character==='char33')return{image:minatoImage,x:95,y:45,size:330};
    if(character==='char34')return{image:cainImage,x:76,y:22,size:310};
    if(character==='char35')return{image:metalBatImage,x:45,y:20,size:520};
    return null;
  }

  function drawChainsawAura(ball) {
    if(!chainsawAsset.width)return;
    const size=ball.radius*5.025;ctx.save();ctx.rotate(state.time*5.2+ball.id);ctx.globalAlpha=.95;ctx.shadowColor='#ff443c';ctx.shadowBlur=18;ctx.drawImage(chainsawAsset,-size/2,-size/2,size,size);ctx.restore();
  }

  function drawErenAura(ball) {
    ctx.save();if(ball.erenForm===2){ctx.strokeStyle='rgba(255,137,67,.72)';ctx.lineWidth=4;ctx.shadowColor='#ff6b35';ctx.shadowBlur=18;ctx.setLineDash([ball.radius*.45,ball.radius*.2]);ctx.rotate(-state.time*2.8);ctx.beginPath();ctx.arc(0,0,ball.radius*1.08,0,Math.PI*2);ctx.stroke()}else if(ball.erenForm===3){const pulse=1+Math.sin(state.time*5)*.08;ctx.strokeStyle='rgba(102,255,168,.7)';ctx.lineWidth=3;ctx.shadowColor='#66ffa8';ctx.shadowBlur=16;ctx.beginPath();ctx.arc(0,0,ball.radius*1.12*pulse,0,Math.PI*2);ctx.stroke()}ctx.restore();
  }

  function drawPredatorSlow(ball) {
    if(state.time>=(ball.predatorSlowedUntil||0))return;ctx.save();ctx.rotate(-state.time*2);ctx.strokeStyle='rgba(117,223,255,.8)';ctx.lineWidth=3;ctx.setLineDash([5,5]);ctx.shadowColor='#614dff';ctx.shadowBlur=13;ctx.beginPath();ctx.arc(0,0,ball.radius*1.11,0,Math.PI*2);ctx.stroke();ctx.restore();
  }

  function drawIceSlow(ball) {
    if(state.time>=(ball.iceSlowedUntil||0))return;ctx.save();ctx.rotate(state.time*1.8);ctx.strokeStyle='rgba(190,246,255,.9)';ctx.lineWidth=2.5;ctx.setLineDash([3,7]);ctx.shadowColor='#79dfff';ctx.shadowBlur=14;ctx.beginPath();ctx.arc(0,0,ball.radius*1.18,0,Math.PI*2);ctx.stroke();for(let i=0;i<6;i++){ctx.rotate(Math.PI/3);ctx.fillStyle='#d9fbff';ctx.fillRect(ball.radius*1.12,-2,7,4)}ctx.restore();
  }

  function drawHitsugayaWings(ball) {
    const remaining=(ball.iceWingsUntil||0)-state.time;if(remaining<=0)return;
    const r=ball.radius,fade=Math.min(1,remaining/.28),pulse=1+Math.sin(state.time*8+ball.id)*.035;
    ctx.save();ctx.globalAlpha=fade;ctx.scale(pulse,pulse);ctx.lineJoin='round';ctx.lineCap='round';ctx.shadowColor='#74ddff';ctx.shadowBlur=22;
    for(const side of [-1,1]){
      ctx.save();ctx.scale(side,1);
      const wing=ctx.createLinearGradient(r*.25,0,r*3,-r*.9);wing.addColorStop(0,'rgba(102,205,255,.72)');wing.addColorStop(.45,'rgba(206,249,255,.9)');wing.addColorStop(1,'rgba(111,213,255,.32)');
      ctx.fillStyle=wing;ctx.strokeStyle='rgba(224,253,255,.95)';ctx.lineWidth=1.7;ctx.beginPath();ctx.moveTo(r*.34,r*.25);ctx.lineTo(r*.92,-r*.58);ctx.lineTo(r*1.18,-r*1.48);ctx.lineTo(r*1.52,-r*.82);ctx.lineTo(r*2.08,-r*1.56);ctx.lineTo(r*2.02,-r*.52);ctx.lineTo(r*2.82,-r*1.02);ctx.lineTo(r*2.42,-r*.08);ctx.lineTo(r*3.02,r*.28);ctx.lineTo(r*2.02,r*.55);ctx.lineTo(r*1.48,r*1.3);ctx.lineTo(r*1.2,r*.58);ctx.lineTo(r*.58,r*.83);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.fillStyle='rgba(22,91,153,.5)';ctx.beginPath();ctx.moveTo(r*.5,r*.27);ctx.lineTo(r*1.05,-r*.42);ctx.lineTo(r*1.42,-r*.66);ctx.lineTo(r*1.25,r*.28);ctx.lineTo(r*1.82,r*.48);ctx.lineTo(r*.92,r*.57);ctx.closePath();ctx.fill();
      ctx.strokeStyle='rgba(236,255,255,.82)';ctx.lineWidth=1.4;for(const tip of [[1.18,-1.48],[2.08,-1.56],[2.82,-1.02],[3.02,.28],[1.48,1.3]]){ctx.beginPath();ctx.moveTo(r*.55,r*.28);ctx.lineTo(r*tip[0],r*tip[1]);ctx.stroke()}
      ctx.fillStyle='#f3ffff';for(const shard of [[1.55,-.94,.1],[2.22,-.62,-.3],[2.36,.34,.5]]){ctx.save();ctx.translate(r*shard[0],r*shard[1]);ctx.rotate(shard[2]);ctx.beginPath();ctx.moveTo(-2,0);ctx.lineTo(0,-r*.18);ctx.lineTo(2,0);ctx.lineTo(0,r*.18);ctx.closePath();ctx.fill();ctx.restore()}
      ctx.restore();
    }
    ctx.strokeStyle='rgba(200,250,255,.88)';ctx.lineWidth=2.5;ctx.setLineDash([5,6]);ctx.rotate(-state.time*2.2);ctx.beginPath();ctx.arc(0,0,r*1.08,0,Math.PI*2);ctx.stroke();ctx.restore();
  }

  function drawKilluaAura(ball) {
    if(state.time>=(ball.killuaActiveUntil||0))return;const r=ball.radius,pulse=1+Math.sin(state.time*14)*.06;
    ctx.save();ctx.scale(pulse,pulse);ctx.lineCap='round';ctx.lineJoin='round';ctx.shadowColor='#79dcff';ctx.shadowBlur=18;
    const glow=ctx.createRadialGradient(0,0,r*.68,0,0,r*1.52);glow.addColorStop(0,'rgba(104,205,255,0)');glow.addColorStop(.62,'rgba(74,164,255,.18)');glow.addColorStop(1,'rgba(181,244,255,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,r*1.52,0,Math.PI*2);ctx.fill();
    for(let bolt=0;bolt<7;bolt++){const angle=bolt*Math.PI*2/7-state.time*(bolt%2?2.4:-2.8),inner=r*(.9+(bolt%3)*.05),outer=r*(1.35+(bolt%2)*.22);ctx.strokeStyle=bolt%2?'#ffffff':'#7bdcff';ctx.lineWidth=bolt%3===0?3:2;ctx.beginPath();ctx.moveTo(Math.cos(angle)*inner,Math.sin(angle)*inner);const midAngle=angle+.18*Math.sin(state.time*19+bolt);ctx.lineTo(Math.cos(midAngle)*(inner+outer)*.53,Math.sin(midAngle)*(inner+outer)*.53);ctx.lineTo(Math.cos(angle+.07)*outer,Math.sin(angle+.07)*outer);ctx.stroke()}
    ctx.strokeStyle='rgba(196,248,255,.9)';ctx.lineWidth=2;ctx.setLineDash([4,8]);ctx.rotate(state.time*4);ctx.beginPath();ctx.arc(0,0,r*1.2,0,Math.PI*2);ctx.stroke();ctx.restore();
  }

  function drawMidoriyaPower(ball) {
    const r=ball.radius;if(ball.midoriyaState==='charging'){const progress=1-Math.max(0,ball.midoriyaChargeUntil-state.time)/3,pulse=1+Math.sin(state.time*28)*.08;ctx.save();ctx.rotate(state.time*4);ctx.strokeStyle='rgba(89,255,200,.9)';ctx.lineWidth=2.5;ctx.setLineDash([5,6]);ctx.shadowColor='#39ffb8';ctx.shadowBlur=20;ctx.beginPath();ctx.arc(0,0,r*(1.12+progress*.45)*pulse,0,Math.PI*2);ctx.stroke();for(let spark=0;spark<6;spark++){const angle=spark*Math.PI/3-state.time*3,distance=r*(1.15+progress*.42);ctx.fillStyle=spark%2?'#ffffff':'#66ffc8';ctx.fillRect(Math.cos(angle)*distance-2,Math.sin(angle)*distance-2,4,4)}ctx.restore();return}
    if(ball.midoriyaState!=='dashing')return;const angle=Math.atan2(ball.vy,ball.vx),flicker=1+Math.sin(state.time*34)*.08;ctx.save();ctx.rotate(angle);ctx.shadowColor='#ff5b32';ctx.shadowBlur=28;
    const tail=ctx.createLinearGradient(-r*4.2,0,r*.2,0);tail.addColorStop(0,'rgba(255,45,20,0)');tail.addColorStop(.38,'rgba(255,72,28,.55)');tail.addColorStop(.72,'rgba(255,177,47,.88)');tail.addColorStop(1,'rgba(255,247,199,.96)');ctx.fillStyle=tail;ctx.beginPath();ctx.moveTo(r*.2,-r*.68);ctx.quadraticCurveTo(-r*1.6,-r*1.28*flicker,-r*4.2,0);ctx.quadraticCurveTo(-r*1.55,r*1.2*flicker,r*.2,r*.68);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(255,246,183,.9)';ctx.beginPath();ctx.moveTo(0,-r*.32);ctx.quadraticCurveTo(-r*1.25,-r*.48,-r*3.15,0);ctx.quadraticCurveTo(-r*1.25,r*.48,0,r*.32);ctx.closePath();ctx.fill();
    ctx.strokeStyle='#57ffc4';ctx.lineWidth=2.5;ctx.shadowColor='#36ffc0';ctx.shadowBlur=16;for(let arc=0;arc<3;arc++){const y=(arc-1)*r*.66;ctx.beginPath();ctx.moveTo(-r*.45,y);ctx.lineTo(-r*(1.15+arc*.18),y-r*.2);ctx.lineTo(-r*(1.7+arc*.3),y+r*.12);ctx.stroke()}ctx.restore();
  }

  function drawGojoAura(ball) {
    if(!gojoModeActive(ball,ball.gojoMode)||ball.gojoMode==='purple')return;const chargingPurple=ball.gojoMode==='purpleCharging',blue=ball.gojoMode==='blue',chargeProgress=chargingPurple?1-Math.max(0,ball.gojoPurpleReleaseAt-state.time)/2:0,pulse=1+Math.sin(state.time*(chargingPurple?15:9))*.08;ctx.save();ctx.rotate((blue?1:-1)*state.time*(chargingPurple?3.8:2.3));ctx.strokeStyle=chargingPurple?'rgba(204,105,255,.96)':blue?'rgba(65,174,255,.9)':'rgba(255,67,105,.92)';ctx.fillStyle=chargingPurple?'rgba(115,39,255,.18)':blue?'rgba(28,91,255,.16)':'rgba(255,34,82,.12)';ctx.lineWidth=chargingPurple?3:4;ctx.shadowColor=chargingPurple?'#bd4fff':blue?'#258cff':'#ff315c';ctx.shadowBlur=chargingPurple?32:24;ctx.beginPath();ctx.arc(0,0,ball.radius*(chargingPurple?1.18+chargeProgress*.3:1.34)*pulse,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.setLineDash(chargingPurple?[3,5]:[8,7]);ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,ball.radius*(chargingPurple?1.45+chargeProgress*.42:blue?1.65:1.78),0,Math.PI*2);ctx.stroke();if(chargingPurple){ctx.fillStyle='#f1c7ff';for(let spark=0;spark<6;spark++){const angle=spark*Math.PI/3+state.time*4.5,distance=ball.radius*(1.7-chargeProgress*.55);ctx.beginPath();ctx.arc(Math.cos(angle)*distance,Math.sin(angle)*distance,2.4,0,Math.PI*2);ctx.fill()}}ctx.restore();
  }

  function drawTransmutationCircle(x,y,radius,color) {
    ctx.save();ctx.translate(x,y);ctx.rotate(state.time*.8);ctx.strokeStyle=color;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.moveTo(0,-radius);ctx.lineTo(radius*.87,radius*.5);ctx.lineTo(-radius*.87,radius*.5);ctx.closePath();ctx.stroke();ctx.rotate(-state.time*1.6);ctx.beginPath();ctx.arc(0,0,radius*.58,0,Math.PI*2);ctx.moveTo(-radius*.58,0);ctx.lineTo(radius*.58,0);ctx.moveTo(0,-radius*.58);ctx.lineTo(0,radius*.58);ctx.stroke();ctx.restore();
  }

  function drawAlchemyLinks() {
    for(const al of state.companions){
      if(al.type!=='al'||state.time>=al.activeUntil)continue;
      const owner=al.owner,dx=al.x-owner.x,dy=al.y-owner.y,distance=Math.hypot(dx,dy)||1,nx=-dy/distance,ny=dx/distance,segments=Math.max(5,Math.ceil(distance/55));
      ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(owner.x,owner.y);
      for(let i=1;i<segments;i++){const t=i/segments,jitter=Math.sin(state.time*18+i*2.7)*7;ctx.lineTo(owner.x+dx*t+nx*jitter,owner.y+dy*t+ny*jitter)}ctx.lineTo(al.x,al.y);
      ctx.strokeStyle='rgba(76,229,255,.38)';ctx.lineWidth=13;ctx.shadowColor='#45e4ff';ctx.shadowBlur=24;ctx.stroke();ctx.strokeStyle='#f6ce58';ctx.lineWidth=4;ctx.shadowColor='#ffe875';ctx.shadowBlur=12;ctx.stroke();ctx.strokeStyle='#e9ffff';ctx.lineWidth=1.4;ctx.stroke();ctx.restore();
      drawTransmutationCircle(owner.x,owner.y,owner.radius*1.13,'rgba(246,206,88,.88)');drawTransmutationCircle(al.x,al.y,al.radius*1.13,'rgba(124,236,255,.88)');
      drawTransmutationCircle((owner.x+al.x)/2,(owner.y+al.y)/2,14,'rgba(255,231,124,.72)');
    }
  }

  function drawAlCompanion(al) {
    ctx.save();ctx.translate(al.x,al.y);ctx.shadowColor='#7cecff';ctx.shadowBlur=18;ctx.fillStyle='#3d4655';ctx.beginPath();ctx.arc(0,0,al.radius,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#7cecff';ctx.lineWidth=2;ctx.stroke();ctx.shadowBlur=0;
    if(alImage.complete&&alImage.naturalWidth)drawCircularPortrait(alImage,0,0,400,al.radius,'#d7e4ed');
    ctx.restore();ctx.save();ctx.textAlign='center';ctx.fillStyle='#bfefff';ctx.shadowColor='#000';ctx.shadowBlur=6;ctx.font=`700 ${Math.max(8,state.width*.013)}px Chakra Petch`;ctx.fillText('AL • SEM VIDA',al.x,al.y+al.radius+15);ctx.restore();
  }

  function drawSoccerBall(ball) {
    const boosted=state.time<ball.boostUntil,r=ball.radius;ctx.save();ctx.translate(ball.x,ball.y);ctx.rotate(ball.rotation);ctx.shadowColor=boosted?'#389cff':'rgba(255,255,255,.65)';ctx.shadowBlur=boosted?28:10;
    if(soccerBallImage.complete&&soccerBallImage.naturalWidth)ctx.drawImage(soccerBallImage,140,140,920,920,-r,-r,r*2,r*2);else{ctx.fillStyle='#f4f7ff';ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#27385e';ctx.lineWidth=2.2;ctx.stroke()}
    ctx.strokeStyle=boosted?'#65baff':'rgba(210,226,255,.75)';ctx.lineWidth=boosted?2.8:1.5;ctx.beginPath();ctx.arc(0,0,r*.96,0,Math.PI*2);ctx.stroke();
    if(boosted){ctx.rotate(-ball.rotation-state.time*5);ctx.strokeStyle='rgba(95,191,255,.86)';ctx.lineWidth=3;ctx.setLineDash([8,7]);ctx.beginPath();ctx.arc(0,0,r*1.38,0,Math.PI*2);ctx.stroke()}ctx.restore();
  }

  function drawRudeusForesight(ball) {
    const active=state.time<ball.rudeusForesightUntil,pulse=1+Math.sin(state.time*11)*.08;
    if(active){ctx.save();ctx.rotate(-ball.rotation*.12);ctx.strokeStyle='rgba(189,255,118,.92)';ctx.lineWidth=2.6;ctx.shadowColor='#8bea52';ctx.shadowBlur=18;ctx.setLineDash([7,5]);ctx.lineDashOffset=-state.time*28;ctx.beginPath();ctx.arc(0,0,ball.radius*1.28*pulse,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='rgba(176,255,103,.12)';ctx.beginPath();ctx.ellipse(0,-ball.radius*.08,ball.radius*.72,ball.radius*.3,0,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#d8ffae';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,-ball.radius*.08,ball.radius*.48,ball.radius*.2,0,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#75d33d';ctx.beginPath();ctx.ellipse(0,-ball.radius*.08,ball.radius*.12,ball.radius*.19,0,0,Math.PI*2);ctx.fill();ctx.restore()}
    if(state.time<ball.rudeusVisionUntil){const dx=ball.rudeusVisionX-ball.x,dy=ball.rudeusVisionY-ball.y;ctx.save();ctx.strokeStyle='rgba(207,255,159,.78)';ctx.lineWidth=1.8;ctx.setLineDash([4,5]);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(dx,dy);ctx.stroke();ctx.setLineDash([]);ctx.translate(dx,dy);ctx.strokeStyle='#d7ffad';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,8+Math.sin(state.time*25)*2,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(-11,0);ctx.lineTo(11,0);ctx.moveTo(0,-11);ctx.lineTo(0,11);ctx.stroke();ctx.restore()}
    if(state.time<ball.rudeusAfterimageUntil){ctx.save();ctx.globalAlpha=Math.max(0,(ball.rudeusAfterimageUntil-state.time)/.35)*.42;ctx.strokeStyle='#caff92';ctx.lineWidth=5;ctx.beginPath();ctx.arc(-ball.vx*.055,-ball.vy*.055,ball.radius*.94,0,Math.PI*2);ctx.stroke();ctx.restore()}
  }

  function drawKiritoDualBlades(ball) {
    if(!kiritoDualBladesActive(ball))return;const heading=Math.atan2(ball.vy,ball.vx),r=ball.radius,pulse=1+Math.sin(state.time*15)*.06;
    ctx.save();ctx.rotate(heading);ctx.strokeStyle='rgba(91,227,255,.42)';ctx.lineWidth=5;ctx.lineCap='round';ctx.shadowColor='#47dfff';ctx.shadowBlur=18;for(let trail=0;trail<3;trail++){const offset=(trail-1)*r*.46;ctx.globalAlpha=.48-trail*.08;ctx.beginPath();ctx.moveTo(-r*(1.35+trail*.38),offset);ctx.lineTo(-r*.55,offset*.55);ctx.stroke()}ctx.restore();
    ctx.save();ctx.translate(Math.cos(heading)*r*.38,Math.sin(heading)*r*.38);ctx.rotate(heading+Math.PI/2);ctx.shadowColor='#5ae8ff';ctx.shadowBlur=18;ctx.globalAlpha=.98;if(kiritoSwordsImage.complete&&kiritoSwordsImage.naturalWidth)ctx.drawImage(kiritoSwordsImage,-r*1.42*pulse,-r*1.42*pulse,r*2.84*pulse,r*2.84*pulse);ctx.restore();
  }

  function drawKiritoSlashWounds(ball) {
    if(state.time>=(ball.kiritoSlashUntil||0))return;const duration=.78,elapsed=duration-(ball.kiritoSlashUntil-state.time),r=ball.radius,seed=ball.kiritoSlashSeed||0;ctx.save();ctx.lineCap='round';ctx.shadowColor='#7cecff';ctx.shadowBlur=18;
    for(let slash=0;slash<6;slash++){const age=elapsed-slash*.085;if(age<0||age>.28)continue;const angle=seed+(slash%3)*.34+(slash%2?Math.PI*.72:-Math.PI*.18),offset=(slash-2.5)*r*.19,length=r*(1.15+(slash%2)*.4),drawProgress=Math.min(1,age/.075),fade=Math.min(1,age/.035)*Math.max(0,1-age/.28);ctx.save();ctx.globalAlpha=fade;ctx.rotate(angle);ctx.translate(0,offset);ctx.strokeStyle=slash%2?'#ffffff':'#7cecff';ctx.lineWidth=slash%2?2.2:3.2;ctx.beginPath();ctx.moveTo(-length*.5,0);ctx.lineTo(-length*.5+length*drawProgress,0);ctx.stroke();ctx.restore()}
    if(elapsed>.38){ctx.globalAlpha=Math.max(0,1-(elapsed-.38)/.4)*.7;ctx.strokeStyle='#ddfcff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,r*(1.05+(elapsed-.38)*.55),-.7,2.15);ctx.stroke()}ctx.restore();
  }

  function drawGeassEffects(ball) {
    const caster=ball.character==='char19'&&state.time<(ball.geassAuraUntil||0),controlled=state.time<(ball.geassEffectUntil||0);if(!caster&&!controlled)return;const r=ball.radius,pulse=1+Math.sin(state.time*12)*.08;ctx.save();ctx.rotate(-ball.rotation*.12);ctx.strokeStyle=controlled?'#ff315f':'rgba(255,67,112,.82)';ctx.shadowColor='#ff174f';ctx.shadowBlur=22;ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,r*(controlled?1.2:1.36)*pulse,0,Math.PI*2);ctx.stroke();
    if(controlled){ctx.save();ctx.translate(0,-r*.05);ctx.rotate(state.time*.8);ctx.fillStyle='rgba(255,25,72,.2)';ctx.strokeStyle='#ff5a82';ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(0,-r*.62);ctx.lineTo(r*.56,r*.34);ctx.lineTo(-r*.56,r*.34);ctx.closePath();ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(0,0,r*.22,0,Math.PI*2);ctx.stroke();for(let spoke=0;spoke<3;spoke++){ctx.rotate(Math.PI*2/3);ctx.beginPath();ctx.moveTo(0,-r*.2);ctx.lineTo(0,-r*.58);ctx.stroke()}ctx.restore();
      if(ball.geassEffectMode==='rush'){const heading=Math.atan2(ball.vy,ball.vx);ctx.rotate(heading);ctx.lineCap='round';for(let streak=0;streak<4;streak++){ctx.globalAlpha=.6-streak*.1;ctx.lineWidth=4-streak*.55;ctx.beginPath();ctx.moveTo(-r*(1.15+streak*.42),(-1.5+streak)*r*.25);ctx.lineTo(-r*.55,(-1.5+streak)*r*.13);ctx.stroke()}}
    }else{ctx.rotate(state.time*1.5);ctx.setLineDash([8,7]);ctx.beginPath();ctx.arc(0,0,r*1.62,0,Math.PI*2);ctx.stroke()}
    ctx.restore();
  }

  function drawSaitamaPower(ball) {
    const r=ball.radius;if(ball.saitamaState==='charging'){const progress=1-Math.max(0,ball.saitamaChargeUntil-state.time)/.55;ctx.save();ctx.rotate(-ball.rotation*.12);ctx.strokeStyle=`rgba(255,225,143,${.4+progress*.55})`;ctx.lineWidth=2+progress*3;ctx.shadowColor='#ff5940';ctx.shadowBlur=12+progress*24;for(let ring=0;ring<3;ring++){ctx.beginPath();ctx.arc(0,0,r*(1.15+ring*.26-progress*.12),ring*.8+state.time*2,ring*.8+state.time*2+Math.PI*1.25);ctx.stroke()}for(let ray=0;ray<8;ray++){ctx.rotate(Math.PI/4);ctx.beginPath();ctx.moveTo(r*1.05,0);ctx.lineTo(r*(1.3+progress*.5),0);ctx.stroke()}ctx.restore()}
    if(state.time<(ball.saitamaPunchFxUntil||0)){const remaining=(ball.saitamaPunchFxUntil-state.time)/.58,progress=1-remaining,angle=ball.saitamaPunchAngle||0;ctx.save();ctx.rotate(angle);ctx.globalAlpha=Math.max(0,remaining);ctx.globalCompositeOperation='screen';if(saitamaPunchImage.complete&&saitamaPunchImage.naturalWidth)ctx.drawImage(saitamaPunchImage,0,0,760,720,r*.15,-r*1.75,r*3.65,r*3.5);ctx.globalCompositeOperation='source-over';ctx.strokeStyle='#fff4cf';ctx.lineWidth=4+progress*5;ctx.shadowColor='#ff4638';ctx.shadowBlur=30;ctx.beginPath();ctx.arc(r*1.25,0,r*(.42+progress*1.25),0,Math.PI*2);ctx.stroke();ctx.lineCap='round';for(let ray=0;ray<9;ray++){const spread=(ray-4)*.18;ctx.save();ctx.rotate(spread);ctx.globalAlpha=Math.max(0,remaining)*(1-Math.abs(ray-4)*.08);ctx.beginPath();ctx.moveTo(r*.75,0);ctx.lineTo(r*(1.8+progress*1.8),0);ctx.stroke();ctx.restore()}ctx.restore()}
  }

  function drawSaitamaHit(ball) {
    if(state.time>=(ball.saitamaHitUntil||0))return;const remaining=(ball.saitamaHitUntil-state.time)/.58,progress=1-remaining,r=ball.radius;ctx.save();ctx.rotate(ball.saitamaHitAngle||0);ctx.globalAlpha=Math.max(0,remaining);ctx.strokeStyle='#fff7dc';ctx.lineWidth=5;ctx.shadowColor='#ff3b2f';ctx.shadowBlur=24;ctx.beginPath();ctx.arc(0,0,r*(1.05+progress*.8),0,Math.PI*2);ctx.stroke();for(let slash=0;slash<7;slash++){ctx.rotate(Math.PI*2/7);ctx.beginPath();ctx.moveTo(r*.3,0);ctx.lineTo(r*(1.25+progress*.65),0);ctx.stroke()}ctx.restore();
  }

  function drawZenitsuTrail(ball) {
    if(state.time>=(ball.zenitsuTrailUntil||0))return;const remaining=(ball.zenitsuTrailUntil-state.time)/.58,startX=ball.zenitsuOldX-ball.x,startY=ball.zenitsuOldY-ball.y,distance=Math.hypot(startX,startY)||1,normalX=-startY/distance,normalY=startX/distance,segments=Math.max(8,Math.ceil(distance/45));ctx.save();ctx.globalAlpha=Math.max(0,remaining);ctx.lineCap='round';ctx.lineJoin='round';
    for(let bolt=0;bolt<3;bolt++){ctx.beginPath();ctx.moveTo(startX,startY);for(let segment=1;segment<segments;segment++){const t=segment/segments,jitter=Math.sin(ball.zenitsuSeed+segment*12.37+bolt*4.2)*(13+bolt*4)*(1-Math.abs(t-.5)*.7);ctx.lineTo(startX*(1-t)+normalX*jitter,startY*(1-t)+normalY*jitter)}ctx.lineTo(0,0);ctx.strokeStyle=bolt===2?'#ffffff':bolt===1?'#ffe44f':'rgba(79,158,255,.65)';ctx.lineWidth=bolt===2?2:bolt===1?5:12;ctx.shadowColor=bolt===2?'#ffffff':'#ffe44f';ctx.shadowBlur=bolt===2?12:25;ctx.stroke()}
    for(let branch=1;branch<segments;branch+=2){const t=branch/segments,baseX=startX*(1-t),baseY=startY*(1-t),side=branch%4<2?1:-1;ctx.strokeStyle='rgba(255,235,91,.75)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(baseX,baseY);ctx.lineTo(baseX+normalX*side*(18+branch%3*7)-startX/distance*18,baseY+normalY*side*(18+branch%3*7)-startY/distance*18);ctx.stroke()}ctx.restore();
  }

  function drawZenitsuAura(ball) {
    const ready=state.time>=(ball.zenitsuReadyAt||Infinity),trailing=state.time<(ball.zenitsuTrailUntil||0);if(!ready&&!trailing)return;const r=ball.radius,pulse=1+Math.sin(state.time*24)*.09;ctx.save();ctx.rotate(-ball.rotation*.12);ctx.strokeStyle='#ffe85d';ctx.shadowColor='#ffdf32';ctx.shadowBlur=ready?28:22;ctx.lineWidth=ready?3.5:3;ctx.beginPath();ctx.arc(0,0,r*1.25*pulse,0,Math.PI*2);ctx.stroke();for(let spark=0;spark<7;spark++){ctx.rotate(Math.PI*2/7);ctx.beginPath();ctx.moveTo(r*.92,0);ctx.lineTo(r*(ready?1.65:1.38),-r*.12);ctx.lineTo(r*(ready?1.3:1.15),r*.12);ctx.stroke()}ctx.restore();
  }

  function drawMeguminState(ball) {
    const r=ball.radius;if(ball.meguminState==='charging'){const pulse=1+Math.sin(state.time*18)*.08;ctx.save();ctx.rotate(-ball.rotation*.12+state.time*2.2);ctx.strokeStyle='#ff5a4f';ctx.shadowColor='#ff283d';ctx.shadowBlur=24;ctx.lineWidth=3;ctx.setLineDash([8,5]);ctx.beginPath();ctx.arc(0,0,r*1.35*pulse,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);for(let ray=0;ray<8;ray++){ctx.rotate(Math.PI/4);ctx.beginPath();ctx.moveTo(r*.95,0);ctx.lineTo(r*1.65,0);ctx.stroke()}ctx.restore()}
    if(state.time<(ball.meguminExhaustedUntil||0)){ctx.save();ctx.rotate(-ball.rotation*.12);ctx.globalAlpha=.72;ctx.fillStyle='rgba(17,13,31,.5)';ctx.beginPath();ctx.arc(0,0,r*1.02,0,Math.PI*2);ctx.fill();ctx.fillStyle='#d9c6ff';ctx.shadowColor='#9a72ff';ctx.shadowBlur=10;ctx.font=`800 ${r*.42}px Chakra Petch`;ctx.fillText('Z',r*.68,-r*.78);ctx.font=`800 ${r*.3}px Chakra Petch`;ctx.fillText('z',r*1.03,-r*1.14);ctx.restore()}
  }

  function drawThorfinnPhase(ball) {
    if(!thorfinnPhased(ball))return;const r=ball.radius,pulse=1+Math.sin(state.time*5)*.08;ctx.save();ctx.rotate(-ball.rotation*.12-state.time*.55);ctx.strokeStyle='rgba(215,255,184,.76)';ctx.shadowColor='#b9ef8c';ctx.shadowBlur=18;ctx.lineWidth=2;ctx.setLineDash([7,8]);for(let ring=0;ring<3;ring++){ctx.beginPath();ctx.arc(0,0,r*(1.15+ring*.23)*pulse,0,Math.PI*2);ctx.stroke()}ctx.setLineDash([]);ctx.restore();
  }

  function drawPoisonedEffect(ball) {
    if(state.time>=(ball.poisonedUntil||0))return;const r=ball.radius;ctx.save();ctx.rotate(-ball.rotation*.12);ctx.strokeStyle='rgba(119,239,91,.82)';ctx.fillStyle='rgba(67,197,69,.25)';ctx.shadowColor='#65e85e';ctx.shadowBlur=14;ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,r*1.02,0,Math.PI*2);ctx.fill();ctx.stroke();for(let bubble=0;bubble<6;bubble++){const angle=bubble*Math.PI/3+state.time*(bubble%2?1.2:-.9),distance=r*(1.05+(bubble%3)*.13),size=r*(.07+(bubble%2)*.04);ctx.beginPath();ctx.arc(Math.cos(angle)*distance,Math.sin(angle)*distance,size,0,Math.PI*2);ctx.fill()}ctx.restore();
  }

  function drawSubaruState(ball) {
    const r=ball.radius,ready=ball.subaruReturnReady,intangible=subaruIntangible(ball);ctx.save();ctx.rotate(-ball.rotation*.12);ctx.strokeStyle=ready?'#d6a5ff':'rgba(133,83,171,.38)';ctx.shadowColor='#8b43bd';ctx.shadowBlur=ready?22:8;ctx.lineWidth=ready?3:1.5;ctx.setLineDash(ready?[7,5]:[3,8]);ctx.rotate(-state.time*(ready?1.4:.45));ctx.beginPath();ctx.arc(0,0,r*(ready?1.2:1.08),0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);if(intangible){ctx.globalAlpha=.5;for(let echo=1;echo<=3;echo++){ctx.beginPath();ctx.arc(-echo*r*.16,0,r*(1+echo*.06),0,Math.PI*2);ctx.stroke()}}ctx.restore();
  }

  function drawSubaruRewindOverlay() {
    if(state.time>=state.subaruRewindUntil)return;const remaining=(state.subaruRewindUntil-state.time)/.95,edge=ctx.createRadialGradient(state.width/2,state.height/2,state.width*.12,state.width/2,state.height/2,state.width*.72);edge.addColorStop(0,'rgba(22,5,31,0)');edge.addColorStop(.58,`rgba(32,8,44,${.13*remaining})`);edge.addColorStop(1,`rgba(2,0,8,${.78*remaining})`);ctx.save();ctx.fillStyle=edge;ctx.fillRect(0,0,state.width,state.height);ctx.globalAlpha=remaining*.22;ctx.fillStyle='#b66cff';for(let line=0;line<9;line++){const y=(line*83+state.time*170)%state.height;ctx.fillRect(0,y,state.width,1)}ctx.restore();
  }

  function drawGenosState(ball) {
    const r=ball.radius,heading=Math.atan2(ball.vy,ball.vx);ctx.save();ctx.rotate(heading);if(ball.genosState==='dashing'){ctx.globalCompositeOperation='screen';for(let jet=-1;jet<=1;jet+=2){const flame=ctx.createLinearGradient(-r*.7,jet*r*.28,-r*2.2,jet*r*.28);flame.addColorStop(0,'#ffffff');flame.addColorStop(.25,'#ffd34f');flame.addColorStop(.65,'#ff5b28');flame.addColorStop(1,'rgba(255,45,20,0)');ctx.fillStyle=flame;ctx.beginPath();ctx.moveTo(-r*.55,jet*r*.16);ctx.lineTo(-r*(1.75+Math.sin(state.time*35+jet)*.18),jet*r*.3);ctx.lineTo(-r*.55,jet*r*.43);ctx.closePath();ctx.fill()}ctx.globalCompositeOperation='source-over'}if(state.time<(ball.genosOverheatedUntil||0)){const pulse=1+Math.sin(state.time*15)*.08;ctx.strokeStyle='#ff5a36';ctx.shadowColor='#ff3c25';ctx.shadowBlur=20;ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,r*1.16*pulse,0,Math.PI*2);ctx.stroke();for(let smoke=0;smoke<4;smoke++){ctx.globalAlpha=.22;ctx.fillStyle=smoke%2?'#ff7a42':'#7e4b52';ctx.beginPath();ctx.arc(-r*.6-smoke*r*.18,(-1.5+smoke)*r*.3,r*(.18+smoke*.025),0,Math.PI*2);ctx.fill()}}if(ball.genosSelfDestructing){const remaining=Math.max(0,ball.genosSelfDestructAt-state.time),flash=Math.floor(remaining*14)%2===0;ctx.globalAlpha=flash?1:.35;ctx.fillStyle='#fff5b3';ctx.shadowColor='#ff321f';ctx.shadowBlur=35;ctx.beginPath();ctx.arc(0,0,r*(.35+(1-remaining/.8)*.2),0,Math.PI*2);ctx.fill();ctx.strokeStyle='#ff5a35';ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,0,r*(1.15+(1-remaining/.8)*.55),0,Math.PI*2);ctx.stroke()}ctx.restore();ctx.globalAlpha=1;
  }

  function drawSungStepTrail(ball) {
    if(state.time>=(ball.sungStepUntil||0))return;const remaining=(ball.sungStepUntil-state.time)/.45,startX=ball.sungOldX-ball.x,startY=ball.sungOldY-ball.y,distance=Math.hypot(startX,startY)||1,nx=-startY/distance,ny=startX/distance;ctx.save();ctx.globalAlpha=Math.max(0,remaining);ctx.lineCap='round';ctx.globalCompositeOperation='screen';for(let layer=0;layer<3;layer++){ctx.strokeStyle=layer===0?'rgba(36,25,112,.5)':layer===1?'#566dff':'#b9d7ff';ctx.lineWidth=layer===0?18:layer===1?7:2;ctx.shadowColor='#5b62ff';ctx.shadowBlur=layer===2?12:28;ctx.beginPath();ctx.moveTo(startX,startY);ctx.quadraticCurveTo(startX*.48+nx*(layer-1)*13,startY*.48+ny*(layer-1)*13,0,0);ctx.stroke()}for(let slash=0;slash<5;slash++){const t=(slash+1)/6,x=startX*(1-t),y=startY*(1-t),spread=13+slash*2;ctx.strokeStyle=slash%2?'#91acff':'#ffffff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-nx*spread,y-ny*spread);ctx.lineTo(x+nx*spread,y+ny*spread);ctx.stroke()}ctx.restore();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
  }

  function drawSungAura(ball) {
    const r=ball.radius,pulse=1+Math.sin(state.time*8)*.06;ctx.save();ctx.rotate(-ball.rotation*.12-state.time*.75);ctx.strokeStyle='rgba(109,119,255,.88)';ctx.shadowColor='#495bff';ctx.shadowBlur=22;ctx.lineWidth=2.5;ctx.setLineDash([8,6]);ctx.beginPath();ctx.arc(0,0,r*1.18*pulse,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);for(let flame=0;flame<6;flame++){ctx.rotate(Math.PI/3);ctx.fillStyle=flame%2?'rgba(83,61,204,.55)':'rgba(99,150,255,.55)';ctx.beginPath();ctx.moveTo(r*.88,-r*.12);ctx.quadraticCurveTo(r*1.32,-r*.28,r*(1.2+Math.sin(state.time*7+flame)*.12),-r*.72);ctx.quadraticCurveTo(r*1.06,-r*.38,r*.88,r*.12);ctx.closePath();ctx.fill()}ctx.restore();
  }

  function drawSungAriseOverlay() {
    if(state.time>=state.sungAriseUntil)return;const remaining=Math.max(0,(state.sungAriseUntil-state.time)/.9),edge=ctx.createRadialGradient(state.width/2,state.height/2,state.width*.08,state.width/2,state.height/2,state.width*.72);edge.addColorStop(0,'rgba(41,37,114,0)');edge.addColorStop(.55,`rgba(35,28,106,${.12*remaining})`);edge.addColorStop(1,`rgba(5,3,25,${.72*remaining})`);ctx.save();ctx.fillStyle=edge;ctx.fillRect(0,0,state.width,state.height);ctx.globalAlpha=remaining*.26;ctx.fillStyle='#7b73ff';for(let line=0;line<7;line++){const y=(line*101-state.time*210)%state.height;ctx.fillRect(0,y,state.width,1)}ctx.restore();
  }

  function drawSungShadow(shadow) {
    const r=shadow.radius,pulse=1+Math.sin(state.time*9+shadow.id)*.07,fade=Math.min(1,shadow.life/.8),portrait=characterPortraitSpec(shadow.copiedCharacter,shadow.copiedErenForm);ctx.save();ctx.translate(shadow.x,shadow.y);ctx.globalAlpha=fade;ctx.rotate(-shadow.rotation*.08);ctx.fillStyle='rgba(17,11,50,.94)';ctx.shadowColor='#625cff';ctx.shadowBlur=26;ctx.beginPath();ctx.arc(0,0,r*1.06,0,Math.PI*2);ctx.fill();ctx.save();ctx.beginPath();ctx.arc(0,0,r*.92,0,Math.PI*2);ctx.clip();if(portrait&&portrait.image.complete&&portrait.image.naturalWidth){ctx.filter='grayscale(1) brightness(.38) sepia(1) hue-rotate(205deg) saturate(5)';ctx.drawImage(portrait.image,portrait.x,portrait.y,portrait.size,portrait.size,-r,-r,r*2,r*2);ctx.filter='none';ctx.fillStyle='rgba(57,37,145,.3)';ctx.fillRect(-r,-r,r*2,r*2)}else{ctx.fillStyle='#171036';ctx.fillRect(-r,-r,r*2,r*2)}ctx.restore();ctx.strokeStyle='#827bff';ctx.lineWidth=2.5;ctx.shadowBlur=18;ctx.beginPath();ctx.arc(0,0,r*.98,0,Math.PI*2);ctx.stroke();ctx.rotate(-state.time*1.6);ctx.setLineDash([5,7]);ctx.beginPath();ctx.arc(0,0,r*1.24*pulse,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);ctx.restore();ctx.save();ctx.globalAlpha=fade;ctx.textAlign='center';ctx.fillStyle='#aaa8ff';ctx.shadowColor='#000';ctx.shadowBlur=6;ctx.font=`700 ${Math.max(7,state.width*.011)}px Chakra Petch`;ctx.fillText('SOMBRA',shadow.x,shadow.y+r+13);ctx.restore();
  }

  function drawTanjiroWaterTrail(tanjiro) {
    if(state.time>=(tanjiro.tanjiroTrailUntil||0)||!(tanjiro.tanjiroTrail?.length))return;const fade=Math.min(1,(tanjiro.tanjiroTrailUntil-state.time)/.48),points=tanjiro.tanjiroTrail;ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.globalAlpha=fade*.42;ctx.strokeStyle='#0d6fba';ctx.lineWidth=tanjiro.radius*1.25;ctx.shadowColor='#3bdcff';ctx.shadowBlur=22;ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);for(let index=1;index<points.length;index++)ctx.quadraticCurveTo(points[index-1].x,points[index-1].y,points[index].x,points[index].y);ctx.lineTo(tanjiro.x,tanjiro.y);ctx.stroke();ctx.globalAlpha=fade*.88;ctx.strokeStyle='#72edff';ctx.lineWidth=tanjiro.radius*.42;ctx.stroke();ctx.globalAlpha=fade;ctx.fillStyle='#d7fdff';for(let index=0;index<points.length;index+=3){const point=points[index],offset=Math.sin(index*2.7+state.time*9)*tanjiro.radius*.45;ctx.beginPath();ctx.arc(point.x+offset,point.y-offset*.35,2.4+(index%2)*1.3,0,Math.PI*2);ctx.fill()}ctx.restore();ctx.globalAlpha=1;
  }

  function drawTanjiroWaterWheel(tanjiro) {
    if(state.time>=(tanjiro.tanjiroWheelUntil||0))return;const pulse=1+Math.sin(state.time*18)*.06,r=tanjiro.radius*1.38*pulse;ctx.save();ctx.rotate(state.time*7*tanjiro.tanjiroCurveSign);ctx.globalAlpha=.92;ctx.strokeStyle='#8af4ff';ctx.lineWidth=5;ctx.lineCap='round';ctx.shadowColor='#31cfff';ctx.shadowBlur=22;for(let arc=0;arc<3;arc++){ctx.beginPath();ctx.arc(0,0,r-arc*6,arc*.75,arc*.75+Math.PI*1.25);ctx.stroke()}ctx.fillStyle='#d9ffff';for(let splash=0;splash<7;splash++){const angle=splash*Math.PI*2/7,distance=r*(.88+(splash%2)*.13);ctx.beginPath();ctx.ellipse(Math.cos(angle)*distance,Math.sin(angle)*distance,5,2.2,angle,0,Math.PI*2);ctx.fill()}ctx.restore();
  }

  function drawItadoriCombo(itadori) {
    const combo=itadori.itadoriCombo||0;ctx.save();ctx.rotate(-itadori.rotation*.12);for(let index=0;index<2;index++){const angle=-Math.PI/2+(index-.5)*.42,x=Math.cos(angle)*itadori.radius*1.18,y=Math.sin(angle)*itadori.radius*1.18;ctx.fillStyle=index<combo?'#ff3e5f':'rgba(26,5,12,.88)';ctx.strokeStyle='#ff8292';ctx.lineWidth=1.4;ctx.shadowColor=index<combo?'#ff2348':'transparent';ctx.shadowBlur=index<combo?10:0;ctx.beginPath();ctx.arc(x,y,3.2,0,Math.PI*2);ctx.fill();ctx.stroke()}if(state.time<(itadori.itadoriFlashUntil||0)){ctx.globalAlpha=Math.max(0,(itadori.itadoriFlashUntil-state.time)/.68);ctx.strokeStyle='#ff284d';ctx.lineWidth=4;ctx.shadowColor='#ff173d';ctx.shadowBlur=24;ctx.beginPath();ctx.arc(0,0,itadori.radius*1.26,0,Math.PI*2);ctx.stroke()}ctx.restore();
  }

  function drawBlackFlashEffect(ball) {
    if(state.time>=(ball.blackFlashUntil||0))return;const fade=Math.max(0,(ball.blackFlashUntil-state.time)/.68);ctx.save();ctx.globalAlpha=fade;ctx.strokeStyle='#ff2147';ctx.lineWidth=3;ctx.lineJoin='bevel';ctx.shadowColor='#ff1539';ctx.shadowBlur=18;for(let bolt=0;bolt<6;bolt++){const base=bolt*Math.PI/3+(ball.blackFlashSeed||0),inner=ball.radius*.25,outer=ball.radius*(1.15+(bolt%2)*.28);ctx.beginPath();ctx.moveTo(Math.cos(base)*inner,Math.sin(base)*inner);ctx.lineTo(Math.cos(base+.2)*outer*.48,Math.sin(base+.2)*outer*.48);ctx.lineTo(Math.cos(base-.12)*outer,Math.sin(base-.12)*outer);ctx.stroke()}ctx.fillStyle=`rgba(16,0,7,${.5*fade})`;ctx.beginPath();ctx.arc(0,0,ball.radius*1.02,0,Math.PI*2);ctx.fill();ctx.restore();ctx.globalAlpha=1;
  }

  function drawMetalBatSwing(metalBat) {
    if(state.time>=(metalBat.metalBatSwingUntil||-Infinity))return;const r=metalBat.radius,angle=metalBatSwingAngle(metalBat),progress=metalBatSwingProgress(metalBat),strength=metalBatStrength(metalBat),color=metalBatSpiritColor(strength);ctx.save();ctx.rotate(angle);ctx.globalCompositeOperation='screen';for(let trail=1;trail<=3;trail++){ctx.globalAlpha=(1-progress)*.08+(.34-trail*.065);ctx.strokeStyle=trail===1?'#ffffff':color;ctx.lineWidth=Math.max(2,r*(.28-trail*.045));ctx.shadowColor=color;ctx.shadowBlur=18;ctx.beginPath();ctx.arc(0,0,r*(2.05+trail*.13),-trail*.42,0);ctx.stroke()}ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.lineCap='round';ctx.strokeStyle='#121722';ctx.lineWidth=r*.24;ctx.beginPath();ctx.moveTo(r*.32,0);ctx.lineTo(r*1.2,0);ctx.stroke();ctx.strokeStyle='#7a2631';ctx.lineWidth=r*.15;ctx.setLineDash([4,3]);ctx.stroke();ctx.setLineDash([]);const steel=ctx.createLinearGradient(r*1.02,-r*.25,r*2.7,r*.2);steel.addColorStop(0,'#48515f');steel.addColorStop(.28,'#f2f6ff');steel.addColorStop(.55,'#8f9baa');steel.addColorStop(.78,'#ffffff');steel.addColorStop(1,'#3e4651');ctx.strokeStyle='#202630';ctx.lineWidth=r*.49;ctx.beginPath();ctx.moveTo(r*1.02,0);ctx.lineTo(r*2.56,0);ctx.stroke();ctx.strokeStyle=steel;ctx.lineWidth=r*.36;ctx.shadowColor=color;ctx.shadowBlur=14;ctx.stroke();ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,255,255,.72)';ctx.lineWidth=Math.max(1.3,r*.055);ctx.beginPath();ctx.moveTo(r*1.18,-r*.09);ctx.lineTo(r*2.48,-r*.09);ctx.stroke();ctx.restore();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
  }

  function drawMetalBatStrengthMarker(metalBat) {
    const strength=metalBatStrength(metalBat),color=metalBatSpiritColor(strength),width=Math.max(54,metalBat.radius*1.75),height=13,x=metalBat.x-width/2,y=metalBat.y-metalBat.radius-43;ctx.save();ctx.fillStyle='rgba(4,7,18,.92)';ctx.fillRect(x-1,y-1,width+2,height+2);ctx.fillStyle='rgba(38,44,66,.9)';ctx.fillRect(x,y,width,height);ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=strength>=80?10:5;ctx.fillRect(x,y,width*strength/100,height);ctx.shadowBlur=0;ctx.strokeStyle=color;ctx.lineWidth=1;ctx.strokeRect(x-.5,y-.5,width+1,height+1);ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`800 ${Math.max(7,state.width*.011)}px Chakra Petch`;ctx.shadowColor='#000';ctx.shadowBlur=4;ctx.fillText(`FORÇA ${Math.round(strength)}%`,metalBat.x,y+height/2+.5);ctx.restore();
  }

  function powerCooldownInfo(ball) {
    if(ball.character==='char1')return{progress:1-Math.max(0,(ball.zenitsuReadyAt-state.time)/5),ready:state.time>=ball.zenitsuReadyAt};
    if(ball.character==='char4'){const duration=ball.thorfinnPassiveTicks<7?7:15;return{progress:1-Math.max(0,(ball.thorfinnNextPhaseAt-state.time)/duration),ready:state.time>=ball.thorfinnNextPhaseAt}}
    if(ball.character==='char6'){const duration=videoCharacterBalance(ball)?.returnCooldown??SUBARU_RETURN_COOLDOWN;return ball.subaruReturnReady?{progress:1,ready:true}:{progress:1-Math.max(0,(ball.subaruReturnReadyAt-state.time)/duration),ready:false}}
    if(ball.character==='char10'){const combo=ball.itadoriCombo||0;return{progress:combo/2,ready:combo===1,segments:[0,1].map(index=>({progress:index<combo?1:0,ready:index<combo}))}}
    if(ball.character==='char15')return ball.soccerBallSpawned?{progress:1,ready:true}:{progress:1-Math.max(0,(ball.nextSoccerBallAt-state.time)/5),ready:false};
    if(ball.character==='char22'){const duration=balancedCooldown('char22',10),segments=[0,1].map(arm=>ball.luffyArmActive?.[arm]?{progress:1,ready:true,active:true}:{progress:1-Math.max(0,((ball.luffyArmReadyAt?.[arm]??state.time)-state.time)/duration),ready:state.time>=(ball.luffyArmReadyAt?.[arm]??state.time),active:false});return{progress:Math.max(...segments.map(segment=>segment.progress)),ready:segments.some(segment=>segment.ready),segments}}
    if(ball.character==='char5'||ball.character==='char23'||ball.character==='char27')return{progress:1,ready:true};
    if(ball.character==='char24'){const duration=ball.erenForm===1?10:ball.erenForm===2?8:5;return{progress:1-Math.max(0,(ball.nextErenFormAt-state.time)/duration),ready:state.time>=ball.nextErenFormAt}}
    if(ball.character==='char25'){const cloneRemaining=Math.max(0,ball.nextCloneAt-state.time),powerRemaining=Math.max(0,ball.nextPowerAt-state.time);if(cloneRemaining<=powerRemaining)return{progress:1-cloneRemaining/11,ready:cloneRemaining<=0};return{progress:1-powerRemaining/18,ready:powerRemaining<=0}}
    if(ball.character==='char26'&&ball.pikachuCharging)return{progress:1,ready:true};
    if(ball.character==='char34'){const filled=ball.cainElementIndex||0,charging=filled<5&&!Number.isFinite(ball.cainReleaseAt),currentProgress=charging?1-Math.max(0,(ball.nextPowerAt-state.time)/1.5):1,segments=Array.from({length:5},(_,index)=>({progress:index<filled?1:index===filled?currentProgress:0,ready:index<filled}));return{progress:filled/5,ready:filled>=5,segments}}
    const durations={char2:ball.meguminHasCast?14.4:9.6,char3:3,char7:7,char8:7,char9:7,char11:14,char12:3.5,char13:12,char14:12,char16:9,char17:9.4,char18:10,char19:10,char20:8,char21:10,char26:10,char28:12,char29:11,char30:5,char31:7.5,char32:7.8,char33:10,char35:4},baseDuration=POWER_BALANCE[ball.character]?.cooldown??POWER_BALANCE[ball.character]?.first??durations[ball.character],duration=videoCharacterCooldown(ball,baseDuration);
    if(!duration)return null;if(!Number.isFinite(ball.nextPowerAt))return{progress:1,ready:true};const remaining=Math.max(0,ball.nextPowerAt-state.time);return{progress:1-remaining/duration,ready:remaining<=0};
  }

  function drawPowerCooldownBar(ball,barWidth,barY) {
    const cooldown=powerCooldownInfo(ball);if(!cooldown)return;const height=6,pulse=.75+Math.sin(state.time*8)*.25,segments=cooldown.segments||[cooldown],gap=segments.length>1?2:0,segmentWidth=(barWidth-gap*(segments.length-1))/segments.length,startX=ball.x-barWidth/2;ctx.fillStyle='rgba(4,5,18,.94)';ctx.fillRect(startX-1,barY-1,barWidth+2,height+2);for(let index=0;index<segments.length;index++){const segment=segments[index],x=startX+index*(segmentWidth+gap),progress=Math.max(0,Math.min(1,segment.progress)),fillWidth=segmentWidth*progress;ctx.fillStyle='rgba(74,67,130,.42)';ctx.fillRect(x,barY,segmentWidth,height);if(fillWidth>0){const gradient=ctx.createLinearGradient(x,0,x+segmentWidth,0);gradient.addColorStop(0,index?'#ff785f':'#796cff');gradient.addColorStop(.55,ball.accent);gradient.addColorStop(1,segment.ready?'#ffffff':'#65f4ff');ctx.fillStyle=gradient;if(segment.ready){ctx.shadowColor='#8cf7ff';ctx.shadowBlur=8+pulse*5}ctx.fillRect(x,barY,fillWidth,height);ctx.shadowBlur=0;if(!segment.ready){ctx.fillStyle='#ffffff';ctx.fillRect(x+Math.max(0,fillWidth-2),barY,2,height)}}ctx.strokeStyle=segment.ready?`rgba(214,252,255,${.72+pulse*.25})`:'rgba(178,190,255,.72)';ctx.lineWidth=1;ctx.strokeRect(x-.5,barY-.5,segmentWidth+1,height+1)}ctx.fillStyle=cooldown.ready?'#ffffff':'#8b85ff';ctx.shadowColor=cooldown.ready?'#69edff':'transparent';ctx.shadowBlur=cooldown.ready?7:0;ctx.beginPath();ctx.arc(startX-5,barY+height/2,2.2,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  }

  function drawBall(ball) {
    if(ball.character==='char1'){ctx.save();ctx.translate(ball.x,ball.y);drawZenitsuTrail(ball);ctx.restore()}
    if(ball.character==='char8'){ctx.save();ctx.translate(ball.x,ball.y);drawSungStepTrail(ball);ctx.restore()}
    if(ball.character==='char9')drawTanjiroWaterTrail(ball);
    if(ball.character==='char17'){ctx.save();ctx.translate(ball.x,ball.y);drawRudeusForesight(ball);ctx.restore()}
    ctx.save();ctx.translate(ball.x,ball.y);if(ball.character==='char16'&&ball.midoriyaState==='charging')ctx.translate(Math.sin(state.time*61+ball.id)*2.8,Math.cos(state.time*53+ball.id)*2.2);if(ball.isClone)ctx.globalAlpha=.72;if(thorfinnPhased(ball))ctx.globalAlpha*=.38;if(ball.character==='char13')drawHitsugayaWings(ball);if(ball.character==='char14')drawKilluaAura(ball);if(ball.character==='char16')drawMidoriyaPower(ball);if(ball.character==='char23'&&ball.sawActive)drawChainsawAura(ball);if(ball.character==='char24')drawErenAura(ball);drawPredatorSlow(ball);drawIceSlow(ball);if(ball.character==='char30')drawGojoAura(ball);ctx.shadowColor=ball.color;ctx.shadowBlur=20;const body=ctx.createRadialGradient(-ball.radius*.3,-ball.radius*.38,ball.radius*.1,0,0,ball.radius);body.addColorStop(0,'#fff');body.addColorStop(.24,ball.color);body.addColorStop(1,'#1a1d3e');ctx.fillStyle=body;ctx.beginPath();ctx.arc(0,0,ball.radius,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle=ball.isClone?'#d8f7ff':ball.accent;ctx.lineWidth=ball.isClone?3:2;ctx.stroke();
    const directRing=ball.character==='char24'?(ball.erenForm===2?'#ff9b52':ball.erenForm===3?'#66ffa8':'#65d7ff'):directPortraitRings[ball.character],directPortrait=directRing?characterPortraitSpec(ball.character,ball.erenForm):null;
    if(directPortrait&&directPortrait.image.complete&&directPortrait.image.naturalWidth){drawCircularPortrait(directPortrait.image,directPortrait.x,directPortrait.y,directPortrait.size,ball.radius,directRing,directPortrait.scale)}else{ctx.rotate(ball.rotation*.12);ctx.fillStyle='rgba(4,7,18,.8)';ctx.beginPath();ctx.arc(0,0,ball.radius*.62,0,Math.PI*2);ctx.fill();ctx.rotate(-ball.rotation*.12);ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`700 ${Math.max(9,ball.radius*.28)}px Chakra Petch`;ctx.fillText(ball.character.toUpperCase(),0,1)}ctx.restore();
    if(ball.character==='char17'&&rudeusImage.complete&&rudeusImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);drawCircularPortrait(rudeusImage,73,25,410,ball.radius,'#b4ef72');ctx.restore()}
    if(ball.character==='char18'&&kiritoImage.complete&&kiritoImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);drawCircularPortrait(kiritoImage,195,30,390,ball.radius,'#70e8ff');drawKiritoDualBlades(ball);ctx.restore()}
    if(ball.character==='char19'&&lelouchImage.complete&&lelouchImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);drawCircularPortrait(lelouchImage,165,0,405,ball.radius,'#ff4c7d');ctx.restore()}
    if(ball.character==='char20'&&saitamaImage.complete&&saitamaImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);drawCircularPortrait(saitamaImage,165,20,440,ball.radius,'#ffcf59');drawSaitamaPower(ball);ctx.restore()}
    if(ball.character==='char1'&&zenitsuImage.complete&&zenitsuImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);drawCircularPortrait(zenitsuImage,98,100,220,ball.radius,'#ffe251');drawZenitsuAura(ball);ctx.restore()}
    if(ball.character==='char2'&&meguminImage.complete&&meguminImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);drawCircularPortrait(meguminImage,188,38,205,ball.radius,'#ff655f');drawMeguminState(ball);ctx.restore()}
    if(ball.character==='char3'&&yorImage.complete&&yorImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);drawCircularPortrait(yorImage,50,28,230,ball.radius,'#f0ca4e');ctx.restore()}
    if(ball.character==='char4'&&thorfinnImage.complete&&thorfinnImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);if(thorfinnPhased(ball))ctx.globalAlpha=.42;drawCircularPortrait(thorfinnImage,150,55,300,ball.radius,'#d5f3a4');ctx.globalAlpha=1;drawThorfinnPhase(ball);ctx.restore()}
    if(ball.character==='char5'&&singedImage.complete&&singedImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);drawCircularPortrait(singedImage,43,0,140,ball.radius,'#9ef58e');ctx.restore()}
    if(ball.character==='char6'&&subaruImage.complete&&subaruImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);if(subaruIntangible(ball))ctx.globalAlpha=.58;const portrait=characterPortraitSpec('char6');drawCircularPortrait(portrait.image,portrait.x,portrait.y,portrait.size,ball.radius,'#d3a4ff');ctx.globalAlpha=1;drawSubaruState(ball);ctx.restore()}
    if(ball.character==='char7'&&genosImage.complete&&genosImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);drawCircularPortrait(genosImage,145,5,250,ball.radius,'#ffbd68');drawGenosState(ball);ctx.restore()}
    if(ball.character==='char8'&&sungImage.complete&&sungImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);drawCircularPortrait(sungImage,390,20,500,ball.radius,'#8fc5ff');drawSungAura(ball);ctx.restore()}
    if(ball.character==='char9'&&tanjiroImage.complete&&tanjiroImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);drawCircularPortrait(tanjiroImage,72,4,410,ball.radius,'#68e8ff');drawTanjiroWaterWheel(ball);ctx.restore()}
    if(ball.character==='char10'&&itadoriImage.complete&&itadoriImage.naturalWidth){ctx.save();ctx.translate(ball.x,ball.y);drawCircularPortrait(itadoriImage,425,0,570,ball.radius,'#ff7184');drawItadoriCombo(ball);ctx.restore()}
    if(ball.character==='char35'){ctx.save();ctx.translate(ball.x,ball.y);drawMetalBatSwing(ball);ctx.restore()}
    if(ball.isTestDummy)drawTestDummy(ball);
    if(state.time<(ball.poisonedUntil||0)){ctx.save();ctx.translate(ball.x,ball.y);drawPoisonedEffect(ball);ctx.restore()}
    if(state.time<(ball.geassEffectUntil||0)||ball.character==='char19'&&state.time<(ball.geassAuraUntil||0)){ctx.save();ctx.translate(ball.x,ball.y);drawGeassEffects(ball);ctx.restore()}
    if(state.time<(ball.saitamaHitUntil||0)){ctx.save();ctx.translate(ball.x,ball.y);drawSaitamaHit(ball);ctx.restore()}
    if(state.time<(ball.kiritoSlashUntil||0)){ctx.save();ctx.translate(ball.x,ball.y);drawKiritoSlashWounds(ball);ctx.restore()}
    if(state.time<(ball.blackFlashUntil||0)){ctx.save();ctx.translate(ball.x,ball.y);drawBlackFlashEffect(ball);ctx.restore()}
    if(ball.character==='char35')drawMetalBatStrengthMarker(ball);ctx.save();const barWidth=ball.radius*1.9,barY=ball.y-ball.radius-23;ctx.fillStyle='rgba(0,0,0,.88)';ctx.fillRect(ball.x-barWidth/2-1,barY-1,barWidth+2,7);ctx.fillStyle='rgba(57,67,86,.78)';ctx.fillRect(ball.x-barWidth/2,barY,barWidth,5);ctx.fillStyle=ball.hp>45?'#66ffa8':'#ff5f5f';ctx.fillRect(ball.x-barWidth/2,barY,barWidth*(ball.hp/ball.maxHp),5);ctx.strokeStyle='rgba(255,255,255,.42)';ctx.lineWidth=.8;ctx.strokeRect(ball.x-barWidth/2-.4,barY-.4,barWidth+.8,5.8);drawPowerCooldownBar(ball,barWidth,barY+9);ctx.textAlign='center';ctx.fillStyle=ball.isClone?'#b7efff':'#fff';ctx.shadowColor='#000';ctx.shadowBlur=6;ctx.font=`700 ${Math.max(8,state.width*.014)}px Chakra Petch`;ctx.fillText(`@${ball.nick}${ball.isClone?' • CLONE':''}`,ball.x,ball.y+ball.radius+16);ctx.restore();
  }

  function drawGetsuga(projectile) {const size=projectile.radius*2.6;ctx.save();ctx.translate(projectile.x,projectile.y);ctx.rotate(projectile.angle+Math.PI);ctx.shadowColor='#ff1938';ctx.shadowBlur=30;if(getsugaImage.complete&&getsugaImage.naturalWidth){ctx.globalAlpha=.24;ctx.drawImage(getsugaImage,-size*.59+size*.18,-size*.59,size*1.18,size*1.18);ctx.globalAlpha=1;ctx.drawImage(getsugaImage,-size*.59,-size*.59,size*1.18,size*1.18)}else{ctx.fillStyle='#7e0e1d';ctx.beginPath();ctx.arc(0,0,size*.5,-Math.PI*.72,Math.PI*.72);ctx.arc(size*.18,0,size*.34,Math.PI*.72,-Math.PI*.72,true);ctx.closePath();ctx.fill()}ctx.restore()}
  function drawGomuFist(projectile) {const owner=projectile.owner,points=[{x:owner.x,y:owner.y},...projectile.trailPoints,{x:projectile.x,y:projectile.y}];ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#2d130e';ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);for(let i=1;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);ctx.stroke();ctx.strokeStyle='#dc9462';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(points[0].x,points[0].y);for(let i=1;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);ctx.stroke();ctx.restore();ctx.save();ctx.translate(projectile.x,projectile.y);const movementAngle=Math.atan2(projectile.vy,projectile.vx);ctx.rotate(projectile.phase==='returning'?movementAngle:movementAngle-Math.PI);ctx.shadowColor='#ffb05b';ctx.shadowBlur=14;if(luffyFistImage.complete&&luffyFistImage.naturalWidth)ctx.drawImage(luffyFistImage,-projectile.radius*1.35,-projectile.radius*1.35,projectile.radius*2.7,projectile.radius*2.7);else{ctx.fillStyle='#df9867';ctx.beginPath();ctx.arc(0,0,projectile.radius,0,Math.PI*2);ctx.fill()}ctx.restore()}
  function drawRasenShuriken(projectile) {const radius=projectile.phase==='zone'?projectile.zoneRadius*(1+Math.sin(state.time*7)*.045):projectile.radius;ctx.save();ctx.translate(projectile.x,projectile.y);ctx.rotate(projectile.rotation);ctx.shadowColor='#45d9ff';ctx.shadowBlur=projectile.phase==='zone'?28:18;ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.clip();if(rasenganImage.complete&&rasenganImage.naturalWidth)ctx.drawImage(rasenganImage,-radius,-radius,radius*2,radius*2);else{ctx.fillStyle='#55d9ff';ctx.fill()}ctx.restore();ctx.save();ctx.translate(projectile.x,projectile.y);ctx.strokeStyle=projectile.phase==='zone'?'rgba(121,231,255,.85)':'rgba(121,231,255,.65)';ctx.lineWidth=projectile.phase==='zone'?3:2;ctx.shadowColor='#45d9ff';ctx.shadowBlur=16;ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.stroke();ctx.restore()}
  function drawThunderStorm(projectile) {ctx.save();ctx.fillStyle=`rgba(62,105,255,${.035+projectile.flash*.09})`;ctx.fillRect(0,0,state.width,state.height);ctx.lineJoin='round';ctx.lineCap='round';for(const bolt of projectile.bolts){const alpha=Math.max(0,bolt.life/bolt.maxLife);for(const path of bolt.paths){ctx.beginPath();ctx.moveTo(path[0].x,path[0].y);for(let i=1;i<path.length;i++)ctx.lineTo(path[i].x,path[i].y);ctx.globalAlpha=alpha*.55;ctx.strokeStyle='#3c7dff';ctx.lineWidth=8;ctx.shadowColor='#2e8cff';ctx.shadowBlur=24;ctx.stroke();ctx.globalAlpha=alpha;ctx.strokeStyle='#ffe96b';ctx.lineWidth=3;ctx.shadowColor='#fff36b';ctx.shadowBlur=15;ctx.stroke();ctx.strokeStyle='#ffffff';ctx.lineWidth=1;ctx.stroke()}if(bolt.impactRadius){ctx.globalAlpha=alpha*.72;ctx.fillStyle='rgba(255,236,91,.12)';ctx.strokeStyle='#fff078';ctx.lineWidth=2.5;ctx.shadowColor='#ffe342';ctx.shadowBlur=24;ctx.beginPath();ctx.arc(bolt.impactX,bolt.impactY,bolt.impactRadius*(1-alpha*.3),0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(bolt.impactX,bolt.impactY,5+alpha*5,0,Math.PI*2);ctx.fill()}}ctx.restore();ctx.globalAlpha=1}
  function drawShadowPossession(projectile){const owner=projectile.owner,end=projectile.phase==='bound'?projectile.boundTarget:projectile;if(!owner||!end)return;ctx.save();ctx.lineCap='round';ctx.lineJoin='round';const pulse=1+Math.sin(state.time*13)*.08,gradient=ctx.createLinearGradient(owner.x,owner.y,end.x,end.y);gradient.addColorStop(0,'rgba(8,10,13,.92)');gradient.addColorStop(.55,'rgba(35,31,43,.95)');gradient.addColorStop(1,'rgba(117,144,84,.9)');ctx.strokeStyle='rgba(0,0,0,.7)';ctx.lineWidth=projectile.radius*1.8*pulse;ctx.shadowColor='#000';ctx.shadowBlur=18;ctx.beginPath();ctx.moveTo(owner.x,owner.y);if(projectile.trailPoints?.length)for(const point of projectile.trailPoints)ctx.lineTo(point.x,point.y);ctx.lineTo(end.x,end.y);ctx.stroke();ctx.strokeStyle=gradient;ctx.lineWidth=projectile.radius*.42;ctx.shadowColor='#8bab66';ctx.shadowBlur=12;ctx.stroke();ctx.setLineDash([7,7]);ctx.strokeStyle='rgba(191,219,153,.72)';ctx.lineWidth=1.5;ctx.stroke();ctx.setLineDash([]);if(projectile.phase==='bound'){ctx.fillStyle='rgba(7,8,12,.38)';ctx.strokeStyle='#a7c77d';ctx.lineWidth=2;ctx.beginPath();ctx.arc(end.x,end.y,end.radius*1.08*pulse,0,Math.PI*2);ctx.fill();ctx.stroke()}ctx.restore()}
  function drawNamiThunderBubble(projectile){const pulse=1+Math.sin(state.time*6+projectile.rotation)*.045,r=projectile.radius*pulse,fade=Math.min(1,projectile.life/.45);ctx.save();ctx.translate(projectile.x,projectile.y);ctx.globalAlpha=fade;const bubble=ctx.createRadialGradient(-r*.28,-r*.34,r*.06,0,0,r);bubble.addColorStop(0,'rgba(255,255,255,.42)');bubble.addColorStop(.52,'rgba(96,212,255,.1)');bubble.addColorStop(.83,'rgba(74,143,228,.14)');bubble.addColorStop(1,'rgba(166,235,255,.5)');ctx.fillStyle=bubble;ctx.strokeStyle=`rgba(181,241,255,${.72+projectile.flash*.25})`;ctx.lineWidth=3;ctx.shadowColor='#65dfff';ctx.shadowBlur=18+projectile.flash*16;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.shadowBlur=12;ctx.fillStyle='rgba(45,51,75,.86)';for(let cloud=0;cloud<5;cloud++){const angle=cloud*Math.PI*2/5+projectile.rotation,distance=r*(cloud? .15:.02),size=r*(.22+(cloud%2)*.055);ctx.beginPath();ctx.arc(Math.cos(angle)*distance,Math.sin(angle)*distance-r*.05,size,0,Math.PI*2);ctx.fill()}ctx.strokeStyle='#ffe95c';ctx.lineWidth=3;ctx.lineJoin='bevel';ctx.shadowColor='#fff06a';ctx.shadowBlur=16;for(const bolt of projectile.bolts){const alpha=Math.max(0,bolt.life/bolt.maxLife),angle=bolt.angle,length=bolt.length;ctx.globalAlpha=fade*alpha;ctx.beginPath();ctx.moveTo(Math.cos(angle)*r*.08,Math.sin(angle)*r*.08);ctx.lineTo(Math.cos(angle+.13)*length*.43,Math.sin(angle+.13)*length*.43);ctx.lineTo(Math.cos(angle-.08)*length*.7,Math.sin(angle-.08)*length*.7);ctx.lineTo(Math.cos(angle)*length,Math.sin(angle)*length);ctx.stroke()}ctx.globalAlpha=fade;ctx.fillStyle='rgba(255,255,255,.72)';ctx.beginPath();ctx.ellipse(-r*.3,-r*.38,r*.16,r*.055,-.65,0,Math.PI*2);ctx.fill();ctx.restore();ctx.globalAlpha=1}
  function drawMinatoPower(projectile){
    if(projectile.type==='minatoFlashTrail'){const fade=Math.max(0,projectile.life/projectile.maxLife),gradient=ctx.createLinearGradient(projectile.fromX,projectile.fromY,projectile.toX,projectile.toY);gradient.addColorStop(0,'rgba(255,255,255,0)');gradient.addColorStop(.4,'rgba(255,238,104,.85)');gradient.addColorStop(1,'rgba(102,202,255,0)');ctx.save();ctx.globalAlpha=fade;ctx.strokeStyle=gradient;ctx.lineWidth=18*fade+2;ctx.lineCap='round';ctx.shadowColor='#ffe45e';ctx.shadowBlur=25;ctx.beginPath();ctx.moveTo(projectile.fromX,projectile.fromY);ctx.lineTo(projectile.toX,projectile.toY);ctx.stroke();ctx.strokeStyle='#ffffff';ctx.lineWidth=2;ctx.stroke();ctx.restore();ctx.globalAlpha=1;return}
    const fade=projectile.used?Math.max(0,projectile.life/.32):Math.min(1,projectile.life/.45);ctx.save();ctx.translate(projectile.x,projectile.y);ctx.rotate(projectile.angle);ctx.globalAlpha=fade;ctx.shadowColor='#ffe45d';ctx.shadowBlur=projectile.phase==='stuck'?18:9;ctx.fillStyle='#dce7f1';ctx.strokeStyle='#ffffff';ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(17,0);ctx.lineTo(2,-6);ctx.lineTo(2,6);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#222b3a';ctx.fillRect(-14,-3,17,6);ctx.strokeStyle='#ffe36b';ctx.lineWidth=2;ctx.beginPath();ctx.arc(-16,0,5,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#ffe36b';ctx.font='900 6px Chakra Petch';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('飛',-5,0);if(projectile.phase==='stuck'&&!projectile.used){ctx.strokeStyle='rgba(255,227,107,.75)';ctx.setLineDash([3,5]);ctx.beginPath();ctx.arc(0,0,15+Math.sin(state.time*8+projectile.index)*2,0,Math.PI*2);ctx.stroke();ctx.setLineDash([])}ctx.restore();ctx.globalAlpha=1;
  }
  function drawCainPower(projectile){
    if(projectile.type==='cainChainFx'){
      const fade=Math.max(0,projectile.life/projectile.maxLife),segments=8;ctx.save();ctx.globalAlpha=fade;ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle='#ffe34d';ctx.lineWidth=5;ctx.shadowColor='#fff07a';ctx.shadowBlur=20;ctx.beginPath();ctx.moveTo(projectile.fromX,projectile.fromY);for(let step=1;step<segments;step++){const t=step/segments,baseX=projectile.fromX+(projectile.toX-projectile.fromX)*t,baseY=projectile.fromY+(projectile.toY-projectile.fromY)*t,angle=Math.atan2(projectile.toY-projectile.fromY,projectile.toX-projectile.fromX)+Math.PI/2,jitter=Math.sin(step*8.7+state.time*45)*9;ctx.lineTo(baseX+Math.cos(angle)*jitter,baseY+Math.sin(angle)*jitter)}ctx.lineTo(projectile.toX,projectile.toY);ctx.stroke();ctx.strokeStyle='#ffffff';ctx.lineWidth=1.5;ctx.stroke();ctx.restore();ctx.globalAlpha=1;return;
    }
    const pulse=1+Math.sin(state.time*10+projectile.orbitAngle)*.1,r=projectile.radius*pulse,auraPulse=1+Math.sin(state.time*6+projectile.orbitAngle)*.08;ctx.save();ctx.translate(projectile.x,projectile.y);
    if(projectile.phase==='flying'){ctx.strokeStyle=projectile.color;ctx.lineWidth=r*.75;ctx.globalAlpha=.34;ctx.shadowColor=projectile.color;ctx.shadowBlur=18;ctx.beginPath();ctx.moveTo(-projectile.vx*.09,-projectile.vy*.09);ctx.lineTo(0,0);ctx.stroke();ctx.globalAlpha=1}
    ctx.save();ctx.globalCompositeOperation='screen';ctx.shadowColor=projectile.color;ctx.shadowBlur=28;ctx.globalAlpha=.18;ctx.fillStyle=projectile.color;ctx.beginPath();ctx.arc(0,0,r*1.9*auraPulse,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=.82;ctx.strokeStyle=projectile.color;ctx.lineWidth=1.8;ctx.rotate(state.time*2.3+projectile.orbitAngle);ctx.setLineDash([7,5]);ctx.beginPath();ctx.arc(0,0,r*1.48*auraPulse,-.25,Math.PI*1.28);ctx.stroke();ctx.rotate(-state.time*4.1);ctx.lineWidth=1.1;ctx.setLineDash([3,6]);ctx.beginPath();ctx.arc(0,0,r*1.72/auraPulse,.4,Math.PI*1.65);ctx.stroke();ctx.setLineDash([]);
    for(let mote=0;mote<5;mote++){const angle=mote*Math.PI*2/5+state.time*(mote%2?1.7:-1.35)+projectile.orbitAngle,distance=r*(1.38+(mote%2)*.38),size=1.7+(mote%3)*.55;ctx.globalAlpha=.55+(mote%2)*.3;ctx.fillStyle=mote%2?'#ffffff':projectile.color;ctx.beginPath();ctx.arc(Math.cos(angle)*distance,Math.sin(angle)*distance,size,0,Math.PI*2);ctx.fill()}ctx.restore();
    ctx.shadowColor=projectile.color;ctx.shadowBlur=24;const glow=ctx.createRadialGradient(-r*.3,-r*.35,1,0,0,r);glow.addColorStop(0,'#ffffff');glow.addColorStop(.35,projectile.color);glow.addColorStop(1,'rgba(20,20,45,.86)');ctx.fillStyle=glow;ctx.strokeStyle='#ffffff';ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#15162c';ctx.font='900 8px Chakra Petch';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(projectile.elementLabel?.[0]||'✦',0,.5);ctx.restore();ctx.globalAlpha=1;
  }
  function drawPredatorVortex(projectile) {const pulse=1+Math.sin(state.time*8)*.045,r=projectile.radius*pulse,fade=Math.min(1,projectile.life/.55);ctx.save();ctx.translate(projectile.x,projectile.y);ctx.rotate(projectile.rotation);ctx.globalAlpha=fade;const voidGlow=ctx.createRadialGradient(0,0,r*.08,0,0,r);voidGlow.addColorStop(0,'rgba(1,2,14,.98)');voidGlow.addColorStop(.42,'rgba(35,20,99,.92)');voidGlow.addColorStop(.72,'rgba(43,102,220,.62)');voidGlow.addColorStop(1,'rgba(80,231,255,0)');ctx.fillStyle=voidGlow;ctx.shadowColor='#604dff';ctx.shadowBlur=28;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();for(let arm=0;arm<5;arm++){ctx.rotate(Math.PI*2/5);ctx.strokeStyle=arm%2?'rgba(117,239,255,.82)':'rgba(132,92,255,.75)';ctx.lineWidth=3;ctx.beginPath();for(let t=0;t<=1;t+=.06){const angle=t*Math.PI*1.55,distance=r*(1-t)*.9,x=Math.cos(angle)*distance,y=Math.sin(angle)*distance;if(t===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.stroke()}ctx.fillStyle='#02030d';ctx.shadowColor='#8cf2ff';ctx.shadowBlur=18;ctx.beginPath();ctx.arc(0,0,r*.2,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(188,249,255,.9)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,r*.28,0,Math.PI*2);ctx.stroke();ctx.restore();ctx.globalAlpha=1}
  function drawKamehameha(projectile) {const beamLength=Math.hypot(state.width,state.height)*1.5,endX=projectile.x+Math.cos(projectile.angle)*beamLength,endY=projectile.y+Math.sin(projectile.angle)*beamLength;ctx.save();ctx.lineCap='round';if(projectile.phase==='charging'){const progress=1-Math.max(0,projectile.chargeLeft)/2.5,orb=8+progress*18;ctx.setLineDash([10,12]);ctx.strokeStyle=`rgba(116,220,255,${.2+progress*.28})`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(projectile.x,projectile.y);ctx.lineTo(endX,endY);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#d9fbff';ctx.shadowColor='#48bfff';ctx.shadowBlur=20+progress*22;ctx.beginPath();ctx.arc(projectile.x,projectile.y,orb,0,Math.PI*2);ctx.fill();for(let i=0;i<5;i++){const angle=state.time*(2+i*.35)+i*Math.PI*.4,radius=orb+10+i*3;ctx.fillStyle=i%2?'#ffffff':'#65d9ff';ctx.beginPath();ctx.arc(projectile.x+Math.cos(angle)*radius,projectile.y+Math.sin(angle)*radius,2.5,0,Math.PI*2);ctx.fill()}}else{const gradient=ctx.createLinearGradient(projectile.x,projectile.y,endX,endY);gradient.addColorStop(0,'#ffffff');gradient.addColorStop(.18,'#8de9ff');gradient.addColorStop(1,'#298cff');ctx.shadowColor='#4ac8ff';ctx.shadowBlur=35;ctx.strokeStyle='rgba(44,126,255,.38)';ctx.lineWidth=projectile.beamWidth+24;ctx.beginPath();ctx.moveTo(projectile.x,projectile.y);ctx.lineTo(endX,endY);ctx.stroke();ctx.strokeStyle=gradient;ctx.lineWidth=projectile.beamWidth;ctx.stroke();ctx.strokeStyle='#efffff';ctx.lineWidth=9;ctx.stroke();ctx.fillStyle='#ffffff';ctx.shadowBlur=28;ctx.beginPath();ctx.arc(projectile.x,projectile.y,projectile.beamWidth*.72,0,Math.PI*2);ctx.fill()}ctx.restore()}
  function drawHollowPurple(projectile) {const r=projectile.radius*(1+Math.sin(state.time*11)*.08);ctx.save();ctx.translate(projectile.x,projectile.y);ctx.rotate(projectile.rotation);ctx.shadowColor='#b648ff';ctx.shadowBlur=34;const glow=ctx.createRadialGradient(-r*.25,-r*.25,r*.05,0,0,r);glow.addColorStop(0,'#ffffff');glow.addColorStop(.18,'#dc9cff');glow.addColorStop(.48,'#7b35db');glow.addColorStop(.78,'#32106f');glow.addColorStop(1,'rgba(25,2,59,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,r*1.18,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(255,157,255,.9)';ctx.lineWidth=3;ctx.setLineDash([9,6]);ctx.beginPath();ctx.arc(0,0,r*.9,0,Math.PI*2);ctx.stroke();ctx.rotate(-projectile.rotation*1.8);ctx.strokeStyle='rgba(86,191,255,.8)';ctx.beginPath();ctx.arc(0,0,r*.62,0,Math.PI*1.55);ctx.stroke();ctx.restore()}
  function drawBomb(projectile) {ctx.save();ctx.translate(projectile.x,projectile.y);if(projectile.phase==='fuse'){const warning=projectile.fuseLeft<.7&&Math.floor(projectile.flash*12)%2===0;ctx.globalAlpha=warning?.48:1;ctx.shadowColor=warning?'#ff334f':'#ff8ac2';ctx.shadowBlur=warning?28:14;if(bombImage.complete&&bombImage.naturalWidth)ctx.drawImage(bombImage,-projectile.radius,-projectile.radius,projectile.radius*2,projectile.radius*2);else{ctx.fillStyle='#172b75';ctx.beginPath();ctx.arc(0,0,projectile.radius*.8,0,Math.PI*2);ctx.fill()}}else{const progress=1-projectile.life/.55,radius=projectile.blastRadius*Math.min(1,progress*1.6),alpha=Math.max(0,projectile.life/.55);ctx.globalAlpha=alpha;const blast=ctx.createRadialGradient(0,0,0,0,0,Math.max(1,radius));blast.addColorStop(0,'#ffffff');blast.addColorStop(.2,'#fff06c');blast.addColorStop(.55,'#ff8b2e');blast.addColorStop(1,'rgba(255,41,58,0)');ctx.fillStyle=blast;ctx.shadowColor='#ff6735';ctx.shadowBlur=35;ctx.beginPath();ctx.arc(0,0,radius,0,Math.PI*2);ctx.fill()}ctx.restore();ctx.globalAlpha=1}
  function drawIceShard(projectile) {ctx.save();ctx.translate(projectile.x,projectile.y);ctx.rotate(projectile.angle+Math.PI/2);ctx.shadowColor='#75dfff';ctx.shadowBlur=15;const gradient=ctx.createLinearGradient(0,-projectile.radius*1.5,0,projectile.radius*1.5);gradient.addColorStop(0,'#ffffff');gradient.addColorStop(.4,'#9cecff');gradient.addColorStop(1,'#2b83d4');ctx.fillStyle=gradient;ctx.beginPath();ctx.moveTo(0,-projectile.radius*1.65);ctx.lineTo(projectile.radius*.55,projectile.radius*.5);ctx.lineTo(0,projectile.radius*1.15);ctx.lineTo(-projectile.radius*.55,projectile.radius*.5);ctx.closePath();ctx.fill();ctx.restore()}
  function drawStone(projectile) {const r=projectile.radius;ctx.save();ctx.translate(projectile.x,projectile.y);ctx.rotate(projectile.rotation);ctx.shadowColor='#9be568';ctx.shadowBlur=9;const rock=ctx.createRadialGradient(-r*.3,-r*.35,1,0,0,r*1.2);rock.addColorStop(0,'#d7d1b7');rock.addColorStop(.4,'#837d69');rock.addColorStop(1,'#36372f');ctx.fillStyle=rock;ctx.beginPath();for(let point=0;point<8;point++){const angle=point*Math.PI/4,distance=r*(point%3===0?1.08:point%2===0?.87:.98),x=Math.cos(angle)*distance,y=Math.sin(angle)*distance;if(point===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)}ctx.closePath();ctx.fill();ctx.strokeStyle='rgba(205,255,154,.72)';ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle='rgba(32,37,26,.42)';ctx.beginPath();ctx.arc(-r*.15,-r*.12,r*.24,0,Math.PI*2);ctx.fill();ctx.restore();ctx.save();ctx.globalAlpha=.28;ctx.fillStyle='#c2d6a1';ctx.beginPath();ctx.arc(projectile.x-projectile.vx*.035,projectile.y-projectile.vy*.035,r*.45,0,Math.PI*2);ctx.fill();ctx.restore()}
  function drawCruelSun(projectile) {const fade=Math.min(1,projectile.life/.6),r=projectile.radius*(1+Math.sin(state.time*5)*.035);ctx.save();ctx.translate(projectile.x,projectile.y);ctx.globalAlpha=fade;ctx.shadowColor='#ff8b1f';ctx.shadowBlur=42;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.clip();if(sunImage.complete&&sunImage.naturalWidth)ctx.drawImage(sunImage,0,0,sunImage.naturalWidth,sunImage.naturalHeight,-r,-r,r*2,r*2);else{const fire=ctx.createRadialGradient(-r*.25,-r*.25,0,0,0,r);fire.addColorStop(0,'#fffbd1');fire.addColorStop(.35,'#ffd34d');fire.addColorStop(1,'#ff6b14');ctx.fillStyle=fire;ctx.fillRect(-r,-r,r*2,r*2)}ctx.restore();ctx.save();ctx.translate(projectile.x,projectile.y);ctx.globalAlpha=fade;ctx.strokeStyle='rgba(255,221,94,.86)';ctx.lineWidth=4;ctx.shadowColor='#ff9a27';ctx.shadowBlur=25;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();ctx.setLineDash([12,9]);ctx.rotate(projectile.rotation);ctx.beginPath();ctx.arc(0,0,r*1.12,0,Math.PI*2);ctx.stroke();ctx.restore();ctx.globalAlpha=1}
  function drawMeguminExplosion(projectile) {const charging=projectile.phase==='charging',progress=charging?1-Math.max(0,projectile.chargeLeft)/1.2:1-Math.max(0,projectile.life)/1.15,r=projectile.radius*(charging?.72+progress*.12:.25+Math.min(1,progress*2.3)*.75);ctx.save();ctx.translate(projectile.x,projectile.y);ctx.rotate(projectile.rotation);if(charging){ctx.globalAlpha=.35+progress*.6;ctx.strokeStyle='#ff6155';ctx.lineWidth=3;ctx.shadowColor='#ff2638';ctx.shadowBlur=18;ctx.setLineDash([14,9]);ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);for(let spoke=0;spoke<12;spoke++){ctx.rotate(Math.PI/6);ctx.beginPath();ctx.moveTo(r*.72,0);ctx.lineTo(r,0);ctx.stroke()}ctx.fillStyle='rgba(126,25,63,.13)';ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill()}else{const fade=Math.max(0,projectile.life/1.15),blast=ctx.createRadialGradient(0,0,0,0,0,Math.max(1,r));blast.addColorStop(0,'rgba(255,255,245,.98)');blast.addColorStop(.13,'rgba(255,241,112,.98)');blast.addColorStop(.36,'rgba(255,102,37,.94)');blast.addColorStop(.68,'rgba(213,20,47,.76)');blast.addColorStop(1,'rgba(81,8,88,0)');ctx.globalAlpha=Math.min(1,fade*1.8);ctx.fillStyle=blast;ctx.shadowColor='#ff4037';ctx.shadowBlur=55;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(255,232,134,.9)';ctx.lineWidth=5;for(let ring=0;ring<3;ring++){ctx.beginPath();ctx.arc(0,0,r*(.45+ring*.24),0,Math.PI*2);ctx.stroke()}for(let ray=0;ray<18;ray++){ctx.rotate(Math.PI/9);ctx.globalAlpha=fade*(.35+(ray%3)*.2);ctx.beginPath();ctx.moveTo(r*.25,0);ctx.lineTo(r*(.88+Math.random()*.18),0);ctx.stroke()}}ctx.restore();ctx.globalAlpha=1}
  function drawYorKnife(projectile) {ctx.save();ctx.translate(projectile.x,projectile.y);ctx.rotate(projectile.angle-Math.PI/2);ctx.shadowColor='#ffd95c';ctx.shadowBlur=13;if(yorKnifeAsset.width){const sourceWidth=yorKnifeAsset.width/2,sourceX=projectile.knifeSide?sourceWidth:0;ctx.drawImage(yorKnifeAsset,sourceX,0,sourceWidth,yorKnifeAsset.height,-9,-28,18,56)}else{ctx.strokeStyle='#f3ca40';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(0,-22);ctx.lineTo(0,25);ctx.stroke()}ctx.restore()}
  function drawSingedPoison(projectile) {const fade=Math.min(1,projectile.life/.8),pulse=1+Math.sin(state.time*4+projectile.rotation)*.07;ctx.save();ctx.translate(projectile.x,projectile.y);ctx.rotate(projectile.rotation);ctx.globalAlpha=fade*.72;ctx.globalCompositeOperation='screen';for(let index=0;index<projectile.puffs.length;index++){const puff=projectile.puffs[index],x=Math.cos(puff.angle)*puff.distance,y=Math.sin(puff.angle)*puff.distance-projectile.life%1*5,r=projectile.radius*puff.size*pulse,cloud=ctx.createRadialGradient(x-r*.2,y-r*.25,1,x,y,r);cloud.addColorStop(0,index%2?'rgba(199,255,133,.82)':'rgba(115,255,104,.9)');cloud.addColorStop(.45,'rgba(57,196,67,.66)');cloud.addColorStop(1,'rgba(39,81,52,0)');ctx.fillStyle=cloud;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}ctx.globalCompositeOperation='source-over';ctx.globalAlpha=fade*.42;ctx.strokeStyle='#9cf483';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(0,0,projectile.radius*(.72+pulse*.18),0,Math.PI*2);ctx.stroke();ctx.restore();ctx.globalAlpha=1}
  function drawSubaruShadow(projectile) {ctx.save();ctx.lineCap='round';ctx.lineJoin='round';const points=projectile.trailPoints;for(let layer=0;layer<3;layer++){ctx.globalAlpha=.22+layer*.2;ctx.strokeStyle=layer===2?'#2b163d':layer===1?'#5b2d78':'#a05bc1';ctx.lineWidth=18-layer*6;ctx.shadowColor='#7c3aa2';ctx.shadowBlur=18;ctx.beginPath();if(points.length){ctx.moveTo(points[0].x,points[0].y);for(let i=1;i<points.length;i++)ctx.lineTo(points[i].x,points[i].y);ctx.lineTo(projectile.x,projectile.y)}ctx.stroke()}ctx.globalAlpha=.9;ctx.translate(projectile.x,projectile.y);ctx.rotate(projectile.angle);ctx.fillStyle='#160b22';ctx.strokeStyle='#a565c2';ctx.lineWidth=2;ctx.shadowColor='#8e49b0';ctx.shadowBlur=18;ctx.beginPath();ctx.ellipse(0,0,15,11,0,0,Math.PI*2);ctx.fill();ctx.stroke();for(let finger=0;finger<5;finger++){const spread=(finger-2)*.2,length=24-Math.abs(finger-2)*3;ctx.save();ctx.rotate(spread);ctx.beginPath();ctx.moveTo(7,(finger-2)*2);ctx.quadraticCurveTo(15,-3,length,0);ctx.stroke();ctx.restore()}ctx.restore();ctx.globalAlpha=1}
  function drawGenosIncinerator(projectile) {const fade=Math.max(0,projectile.life/projectile.maxLife),pulse=1+Math.sin(state.time*28)*.045;ctx.save();ctx.translate(projectile.x,projectile.y);ctx.rotate(projectile.angle);ctx.globalAlpha=Math.min(1,fade*1.8);ctx.globalCompositeOperation='screen';const flame=ctx.createLinearGradient(0,0,projectile.length,0);flame.addColorStop(0,'#ffffff');flame.addColorStop(.08,'#fff29a');flame.addColorStop(.38,'#ff9c36');flame.addColorStop(.75,'rgba(255,62,25,.72)');flame.addColorStop(1,'rgba(129,15,20,0)');ctx.fillStyle=flame;ctx.shadowColor='#ff5a24';ctx.shadowBlur=35;ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,projectile.length*pulse,-projectile.halfAngle,projectile.halfAngle);ctx.closePath();ctx.fill();ctx.fillStyle='rgba(255,255,225,.85)';ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,projectile.length*.7,-projectile.halfAngle*.27,projectile.halfAngle*.27);ctx.closePath();ctx.fill();ctx.globalCompositeOperation='source-over';ctx.restore();ctx.globalAlpha=1}
  function drawGenosExplosion(projectile) {const progress=1-projectile.life/projectile.maxLife,r=projectile.radius*Math.min(1,progress*2.1),fade=Math.max(0,projectile.life/projectile.maxLife);ctx.save();ctx.translate(projectile.x,projectile.y);ctx.globalAlpha=Math.min(1,fade*1.8);const blast=ctx.createRadialGradient(0,0,0,0,0,Math.max(1,r));blast.addColorStop(0,'#ffffff');blast.addColorStop(.18,'#fff49a');blast.addColorStop(.45,'#ff9a31');blast.addColorStop(.72,'#ff3e25');blast.addColorStop(1,'rgba(100,8,17,0)');ctx.fillStyle=blast;ctx.shadowColor='#ff4b27';ctx.shadowBlur=48;ctx.beginPath();ctx.arc(0,0,r,0,Math.PI*2);ctx.fill();ctx.strokeStyle='rgba(255,242,160,.88)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,0,r*.78,0,Math.PI*2);ctx.stroke();ctx.restore();ctx.globalAlpha=1}
  const drawGomuFistBase=drawGomuFist;
  drawGomuFist=projectile=>projectile.type==='stone'?drawStone(projectile):drawGomuFistBase(projectile);
  function draw() { drawBackground();drawSubaruRewindOverlay();drawSungAriseOverlay();for(const projectile of state.projectiles){if(projectile.type==='genosExplosion')drawGenosExplosion(projectile);else if(projectile.type==='genosIncinerator')drawGenosIncinerator(projectile);else if(projectile.type.startsWith('minato'))drawMinatoPower(projectile);else if(projectile.type.startsWith('cain'))drawCainPower(projectile);else if(projectile.type==='shadowPossession')drawShadowPossession(projectile);else if(projectile.type==='namiThunderBubble')drawNamiThunderBubble(projectile);else if(projectile.type==='subaruShadow')drawSubaruShadow(projectile);else if(projectile.type==='singedPoison')drawSingedPoison(projectile);else if(projectile.type==='yorKnife')drawYorKnife(projectile);else if(projectile.type==='meguminExplosion')drawMeguminExplosion(projectile);else if(projectile.type==='getsuga')drawGetsuga(projectile);else if(projectile.type==='rasenShuriken')drawRasenShuriken(projectile);else if(projectile.type==='thunderStorm')drawThunderStorm(projectile);else if(projectile.type==='predator')drawPredatorVortex(projectile);else if(projectile.type==='kamehameha')drawKamehameha(projectile);else if(projectile.type==='hollowPurple')drawHollowPurple(projectile);else if(projectile.type==='cruelSun')drawCruelSun(projectile);else if(projectile.type==='bomb')drawBomb(projectile);else if(projectile.type==='iceShard')drawIceShard(projectile);else drawGomuFist(projectile)}drawAlchemyLinks();for(const ball of state.balls)drawBall(ball);for(const companion of state.companions){if(companion.type==='soccerBall')drawSoccerBall(companion);else if(companion.type==='sungShadow')drawSungShadow(companion);else drawAlCompanion(companion)}for(const p of state.particles){ctx.globalAlpha=Math.max(0,p.life/p.maxLife);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,p.size,p.size)}for(const floater of state.floaters){ctx.globalAlpha=Math.max(0,floater.life/floater.maxLife);ctx.fillStyle=floater.color;ctx.textAlign='center';ctx.font='800 13px Chakra Petch';ctx.fillText(floater.text,floater.x,floater.y)}ctx.globalAlpha=1; }
  function renderQueue(){const video=state.viewMode==='video',players=video?[...state.profiles.values()].map(profile=>({nick:profile.nick,character:profile.lastCharacter,tier:'video',color:profile.color,avatarUrl:profile.avatarUrl||'',eliminated:!profile.active})):state.queue;ui.queueCount.textContent=players.length;ui.queueEmpty.hidden=players.length>0;ui.queueEmpty.textContent=video?'Inicie o sorteio dos seis lutadores abaixo':'A fila está vazia';ui.queueList.innerHTML=players.map((player,index)=>`<li class="queue-item${player.eliminated?' is-eliminated':''}" style="--item-color:${player.color}"><span class="queue-avatar${player.avatarUrl?' has-photo':''}"${player.avatarUrl?` style="background-image:url('${player.avatarUrl}')"`:''}>${player.avatarUrl?'':player.nick.charAt(0).toUpperCase()}</span><span class="queue-info"><strong>${video?'':'@'}${player.nick}</strong><small>${characterDisplayName(player.character)} • ${tierConfig[player.tier].shortLabel}</small></span><span class="queue-position">${player.eliminated?'K.O.':index+1}</span></li>`).join('')}
  function renderRanking(){if(state.viewMode==='video'){liveRankingList.innerHTML='';ui.rankingList.innerHTML='';ui.rankingEmpty.hidden=false;return}const ranked=[...state.profiles.values()].filter(profile=>!profile.isBot&&profile.score>0).sort((a,b)=>b.score-a.score||b.kos-a.kos).slice(0,10);liveRankingList.innerHTML=Array.from({length:3},(_,index)=>{const profile=ranked[index];return profile?`<li style="--medal:${index===0?'#ffd15c':index===1?'#cbd3df':'#c47a47'}"><span>${profile.nick.charAt(0).toUpperCase()}<i>${index+1}</i></span><b>@${profile.nick}</b><small>${Math.round(profile.score)} pts</small></li>`:`<li class="is-empty"><span>—<i>${index+1}</i></span><b>aguardando</b><small>0 pts</small></li>`}).join('');ui.rankingEmpty.hidden=ranked.length>0;ui.rankingEmpty.textContent='O ranking começa com o primeiro dano';const podium=ranked.slice(0,3).map((profile,index)=>`<li class="rank-card rank-card--${index+1}" style="--player-color:${profile.color}"><span class="rank-avatar-wrap"><span class="rank-avatar">${profile.nick.charAt(0).toUpperCase()}</span><span class="rank-medal">${index+1}</span></span><span class="rank-info"><strong>@${profile.nick}</strong><span class="rank-score">${Math.round(profile.score)} PTS</span><small>${Math.round(profile.damage)} dano • ${profile.kos} K.O.</small></span></li>`).join('');const remaining=ranked.slice(3).map((profile,index)=>`<li class="rank-row"><span class="rank-row-position">${String(index+4).padStart(2,'0')}</span><strong>@${profile.nick}</strong><b>${Math.round(profile.score)} PTS</b></li>`).join('');ui.rankingList.innerHTML=podium+(remaining?`<li class="rank-divider">4º — 10º LUGAR</li>`+remaining:'')}
  function syncUi(){const players=playerBallCount();ui.active.textContent=players;ui.empty.hidden=players>0;renderQueue();renderRanking()}
  function frame(now){const dt=Math.min(.033,(now-state.lastTime)/1000);state.lastTime=now;if(state.running)update(dt*state.speed);draw();requestAnimationFrame(frame)}
  function togglePause(){if(state.videoIntroActive||liveEntryInProgress)return;state.running=!state.running;const label=state.running?'Ⅱ PAUSAR':'▶ CONTINUAR';ui.pause.textContent=label;videoPauseButton.textContent=label}

  document.querySelectorAll('.donation').forEach(button=>button.addEventListener('click',()=>runRoulette(button.dataset.tier)));
  ui.viewer.addEventListener('input',()=>{ui.error.textContent=''});
  ui.pause.addEventListener('click',togglePause);
  ui.dummyTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'boneco_teste';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS){ui.error.textContent='A arena já está com 6 jogadores.';return}ui.error.textContent='';spawnBall(nick,'dummy','video');ui.viewer.value=''});
  videoPauseButton.addEventListener('click',togglePause);
  videoRecordButton.addEventListener('click',startAutomaticRecording);
  videoGenerateButton.addEventListener('click',generateVideoBattle);
  const videoCharacterOptions=`<option value="">✦ PERSONAGEM ALEATÓRIO</option>`+ALL_CHARACTERS.map((character,index)=>`<option value="${character}">${String(index+1).padStart(2,'0')} • ${characterDisplayName(character)}</option>`).join('');
  for(const [index,select] of videoPlayerCharacterSelects.entries()){select.innerHTML=videoCharacterOptions;select.addEventListener('change',syncVideoCharacterOptions);const pickerButton=document.createElement('button');pickerButton.type='button';pickerButton.className='video-character-picker-button';pickerButton.addEventListener('click',()=>openVideoCharacterPicker(index));select.insertAdjacentElement('afterend',pickerButton);videoCharacterPickerButtons.push(pickerButton)}syncVideoCharacterOptions();
  videoCharacterPickerGrid.addEventListener('click',event=>{const choice=event.target.closest('.video-character-choice');if(!choice||choice.disabled||videoCharacterPickerIndex<0)return;const select=videoPlayerCharacterSelects[videoCharacterPickerIndex];select.value=choice.dataset.character||'';select.dispatchEvent(new Event('change'));closeVideoCharacterPicker()});
  videoCharacterPickerClose.addEventListener('click',closeVideoCharacterPicker);
  videoCharacterPicker.addEventListener('click',event=>{if(event.target===videoCharacterPicker)closeVideoCharacterPicker()});
  for(const slot of videoPlayerSlots){
    const input=slot.querySelector('.video-player-name'),search=slot.querySelector('.video-player-search'),avatarButton=slot.querySelector('.video-player-avatar'),upload=slot.querySelector('.video-player-avatar-upload'),status=slot.querySelector('.video-player-status');
    search.addEventListener('click',()=>searchVideoPlayerAvatar(slot));input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();searchVideoPlayerAvatar(slot)}});input.addEventListener('input',()=>{const username=parseTikTokUsername(input.value).toLowerCase();if(slot.dataset.avatarUsername&&slot.dataset.avatarUsername!==username)clearVideoPlayerAvatar(slot);updateVideoParticipantsCaption()});
    avatarButton.addEventListener('click',()=>upload.click());upload.addEventListener('change',async()=>{const file=upload.files?.[0];if(!file)return;if(!file.type.startsWith('image/')||file.size>2_500_000){slot.classList.add('is-error');status.textContent='Use PNG, JPG ou WebP de até 2,5 MB';upload.value='';return}try{const dataUrl=await blobAsDataUrl(file),username=parseTikTokUsername(input.value);setVideoPlayerAvatar(slot,dataUrl,username,'Imagem manual pronta');if(username)rememberVideoParticipant(username,dataUrl);updateVideoParticipantsCaption()}catch{slot.classList.add('is-error');status.textContent='Não foi possível abrir a imagem'}upload.value=''})
  }
  videoParticipantList?.addEventListener('click',event=>{const button=event.target.closest('.video-participant-chip');if(button)useSavedVideoParticipant(button.dataset.username)});
  videoSlotsClear?.addEventListener('click',()=>{for(const [index,slot] of videoPlayerSlots.entries()){videoPlayerNameInputs[index].value='';videoPlayerCharacterSelects[index].value='';videoPlayerImpactToggles[index].checked=false;const upload=slot.querySelector('.video-player-avatar-upload');if(upload)upload.value='';clearVideoPlayerAvatar(slot)}syncVideoCharacterOptions();updateVideoParticipantsCaption();setVideoParticipantFeedback('Os seis slots foram limpos. As pessoas salvas continuam disponíveis.')});
  videoParticipantsReset?.addEventListener('click',()=>{if(!savedVideoParticipants.length){setVideoParticipantFeedback('A lista já está vazia.');return}if(!confirm('Remover todas as pessoas salvas deste celular?'))return;for(const username of savedVideoParticipants){try{localStorage.removeItem(avatarCacheKey(username))}catch{/* Sem acesso ao armazenamento. */}}savedVideoParticipants=[];try{localStorage.removeItem(VIDEO_PARTICIPANTS_KEY)}catch{/* A lista da sessão ainda será limpa. */}renderVideoParticipants();setVideoParticipantFeedback('Pessoas salvas removidas. Os slots atuais foram mantidos.')});
  videoCaptionCopy?.addEventListener('click',async()=>{const copied=await copyVideoText(videoParticipantsCaption.value);videoCaptionCopy.textContent=copied?'COPIADO ✓':'NÃO COPIOU';setTimeout(()=>{videoCaptionCopy.textContent='COPIAR'},1400)});
  renderVideoParticipants();updateVideoParticipantsCaption();
  musicToggle.addEventListener('click',toggleBackgroundMusic);
  musicSelect.value=backgroundTrackId;musicSelect.addEventListener('change',()=>selectBackgroundTrack(musicSelect.value));
  document.addEventListener('pointerdown',function unlockBackgroundMusic(event){getSfxAudioContext();if(event.target.closest('#musicToggle'))return;startBackgroundMusic();document.removeEventListener('pointerdown',unlockBackgroundMusic)},{passive:true});
  backgroundMusic.addEventListener('playing',updateMusicButton);backgroundMusic.addEventListener('pause',updateMusicButton);backgroundMusic.addEventListener('error',()=>{musicStarted=false;musicEnabled=false;updateMusicButton()});updateMusicButton();
  charactersInfoButton.addEventListener('click',openCharactersModal);
  charactersModalClose.addEventListener('click',closeCharactersModal);
  charactersGallery.addEventListener('click',event=>{const card=event.target.closest('.character-guide-card');if(card)playCharacterCue(card.dataset.character,'intro',{preview:true})});
  characterAudioReplay.addEventListener('click',()=>{if(selectedAudioCharacter)playCharacterCue(selectedAudioCharacter,'intro',{preview:true})});
  characterAudioVolume.addEventListener('input',()=>{characterPreviewAudio.volume=Number(characterAudioVolume.value)});
  characterPreviewAudio.addEventListener('playing',()=>{characterAudioStatus.textContent='TOCANDO • APRESENTAÇÃO'});
  characterPreviewAudio.addEventListener('ended',()=>{characterAudioStatus.textContent='FINALIZADO • CLIQUE EM REPETIR'});
  characterPreviewAudio.addEventListener('error',()=>{if(selectedAudioCharacter)characterAudioStatus.textContent=`SEM ÁUDIO • adicione ${selectedAudioCharacter}-intro.mp3`});
  charactersModal.addEventListener('click',event=>{if(event.target===charactersModal)closeCharactersModal()});
  charactersModal.addEventListener('close',()=>{document.body.classList.remove('characters-modal-open');releaseAudioDuck(characterPreviewAudio);characterPreviewAudio.pause()});
  liveQueueSimulation.addEventListener('click',()=>setLiveQueueSimulation(!liveQueueSimulationRunning));
  for(const button of liveBridgeTestButtons)button.addEventListener('click',()=>simulateBridgeDonation(button.dataset.liveTestAction));
  for(const button of modeButtons)button.addEventListener('click',()=>setViewMode(button.dataset.mode));
  ui.escanorTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_escanor';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char11','medium');else spawnBall(nick,'char11','medium');ui.viewer.value=''});
  ui.bombermanTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_bomberman';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char12','medium');else spawnBall(nick,'char12','medium');ui.viewer.value=''});
  ui.hitsugayaTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_hitsugaya';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char13','medium');else spawnBall(nick,'char13','medium');ui.viewer.value=''});
  ui.killuaTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_killua';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char14','medium');else spawnBall(nick,'char14','medium');ui.viewer.value=''});
  ui.isagiTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_isagi';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char15','medium');else spawnBall(nick,'char15','medium');ui.viewer.value=''});
  ui.midoriyaTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_midoriya';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char16','medium');else spawnBall(nick,'char16','medium');ui.viewer.value=''});
  ui.rudeusTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_rudeus';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char17','medium');else spawnBall(nick,'char17','medium');ui.viewer.value=''});
  kiritoTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_kirito';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char18','medium');else spawnBall(nick,'char18','medium');ui.viewer.value=''});
  lelouchTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_lelouch';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char19','medium');else spawnBall(nick,'char19','medium');ui.viewer.value=''});
  saitamaTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_saitama';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char20','medium');else spawnBall(nick,'char20','medium');ui.viewer.value=''});
  zenitsuTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_zenitsu';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char1','small');else spawnBall(nick,'char1','small');ui.viewer.value=''});
  meguminTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_megumin';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char2','small');else spawnBall(nick,'char2','small');ui.viewer.value=''});
  yorTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_yor';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char3','small');else spawnBall(nick,'char3','small');ui.viewer.value=''});
  thorfinnTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_thorfinn';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char4','small');else spawnBall(nick,'char4','small');ui.viewer.value=''});
  singedTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_singed';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char5','small');else spawnBall(nick,'char5','small');ui.viewer.value=''});
  subaruTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_subaru';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char6','small');else spawnBall(nick,'char6','small');ui.viewer.value=''});
  genosTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_genos';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char7','small');else spawnBall(nick,'char7','small');ui.viewer.value=''});
  sungTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_sung';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char8','small');else spawnBall(nick,'char8','small');ui.viewer.value=''});
  tanjiroTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_tanjiro';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char9','small');else spawnBall(nick,'char9','small');ui.viewer.value=''});
  itadoriTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_itadori';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char10','small');else spawnBall(nick,'char10','small');ui.viewer.value=''});
  shikamaruTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_shikamaru';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char31','small');else spawnBall(nick,'char31','small');ui.viewer.value=''});
  namiTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_nami';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char32','small');else spawnBall(nick,'char32','small');ui.viewer.value=''});
  metalBatTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_metalbat';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char35','small');else spawnBall(nick,'char35','small');ui.viewer.value=''});
  ui.ichigoTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_ichigo';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char21','large');else spawnBall(nick,'char21','large');ui.viewer.value=''});
  ui.luffyTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_luffy';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char22','large');else spawnBall(nick,'char22','large');ui.viewer.value=''});
  ui.denjiTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_denji';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char23','large');else spawnBall(nick,'char23','large');ui.viewer.value=''});
  ui.erenTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_eren';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char24','large');else spawnBall(nick,'char24','large');ui.viewer.value=''});
  ui.narutoTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_naruto';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char25','large');else spawnBall(nick,'char25','large');ui.viewer.value=''});
  ui.pikachuTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_pikachu';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char26','large');else spawnBall(nick,'char26','large');ui.viewer.value=''});
  ui.edwardTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_edward';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char27','large');else spawnBall(nick,'char27','large');ui.viewer.value=''});
  ui.rimuruTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_rimuru';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char28','large');else spawnBall(nick,'char28','large');ui.viewer.value=''});
  ui.gokuTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_goku';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char29','large');else spawnBall(nick,'char29','large');ui.viewer.value=''});
  ui.gojoTest.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_gojo';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char30','large');else spawnBall(nick,'char30','large');ui.viewer.value=''});
  minatoTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_minato';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char33','large');else spawnBall(nick,'char33','large');ui.viewer.value=''});
  cainTestButton.addEventListener('click',()=>{if(state.spinning)return;const nick=sanitizeName(ui.viewer.value)||'teste_cain';if(state.balls.some(ball=>ball.nick.toLowerCase()===nick.toLowerCase())){ui.error.textContent='Esse nick já está vivo na arena.';return}if(playerBallCount()>=MAX_BALLS)enqueuePlayer(nick,'char34','large');else spawnBall(nick,'char34','large');ui.viewer.value=''});
  ui.remove.addEventListener('click',removeOldestBall);
  ui.clear.addEventListener('click',clearArenaSession);
  ui.speed.addEventListener('change',event=>{state.speed=Number(event.target.value)});
  window.addEventListener('resize',()=>{fitCanvas();for(const ball of state.balls){ball.baseMoveSpeed=state.width*.18;ball.moveSpeed=ball.character==='char24'?(ball.erenForm===2?ball.baseMoveSpeed*2:ball.erenForm===3?ball.baseMoveSpeed*.58:ball.baseMoveSpeed):ball.baseMoveSpeed;keepConstantSpeed(ball);ball.x=Math.min(state.width-ball.radius,Math.max(ball.radius,ball.x));ball.y=Math.min(state.height-ball.radius,Math.max(ball.radius,ball.y))}for(const companion of state.companions){companion.baseMoveSpeed=state.width*(companion.type==='soccerBall'?.18:companion.type==='sungShadow'?.24:.14);companion.moveSpeed=companion.baseMoveSpeed;const targetSpeed=companion.baseMoveSpeed*(companion.type==='soccerBall'&&state.time<companion.boostUntil?3:1),speed=Math.hypot(companion.vx,companion.vy)||1;companion.vx=companion.vx/speed*targetSpeed;companion.vy=companion.vy/speed*targetSpeed;companion.x=Math.min(state.width-companion.radius,Math.max(companion.radius,companion.x));companion.y=Math.min(state.height-companion.radius,Math.max(companion.radius,companion.y))}});
  const requestedMode=new URLSearchParams(window.location.search).get('mode');setViewMode(requestedMode==='video'?'video':'live');fitCanvas();syncUi();connectLiveBridge();setInterval(drainLiveDonations,180);setInterval(updateLiveBots,400);requestAnimationFrame(frame);
})();
