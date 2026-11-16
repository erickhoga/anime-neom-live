# Anime Neom Clash + TikFinity

## Abrir a arena local

1. Instale o Node.js LTS caso o computador ainda não tenha o comando `node`.
2. Dê dois cliques em `iniciar-live.bat`.
3. Mantenha aberta a janela preta chamada **Anime Neom Clash - Ponte**.
4. A arena abre em `http://127.0.0.1:8832/?mode=live`.

O painel que fica fora do enquadramento da LIVE mostra a conexão e contém cinco botões de teste:

- `EU`: comentário de entrada na categoria baixa;
- `50♥`: 50 curtidas curam 10 HP;
- `🌹`: Rosa e entrada na categoria média;
- `🦖`: Mini Dino e entrada na categoria grande.
- `💥`: presente de 200 moedas e explosão da arena.

## Conectar o TikFinity

1. Abra o site do TikFinity.
2. Entre em **Configurações / Integrações / Third-Party**.
3. Cadastre ou teste o endereço `http://127.0.0.1:8832`.
4. O TikFinity deve identificar **Anime Neom Clash 1.0.0**.

## Criar as cinco Actions

Em **Ações**, crie uma Action e adicione o efeito **Action de terceiros**. Selecione a categoria **Anime Neom Clash** e uma destas ações:

- **Comentou !EU • entrar na categoria baixa**;
- **50 curtidas • curar 10 HP**;
- **Rosa • entrar na categoria média**;
- **Mini Dino • entrar na categoria grande**.
- **Presente de 200 moedas • explodir arena**.

Na aba **Eventos**, faça os vínculos:

- **Commenting a command** com o comando `!eu` → entrada baixa;
- bloco de 50 curtidas do usuário → cura de 10 HP;
- presente Rosa → entrada média;
- presente Mini Dino → entrada grande.
- presente com valor de 200 moedas → explosão que elimina todos que estão na arena.

O comando `!eu` é ignorado se a pessoa já estiver viva ou aguardando na fila. A cura também é ignorada quando a pessoa ainda não possui personagem. Uma nova Rosa ou Mini Dino cura o personagem do usuário caso ele já esteja vivo, preservando a regra anterior de doações repetidas.

A cura por curtidas tem cooldown interno de 20 segundos por usuário. Mesmo que o TikFinity envie vários lotes seguidos, cada pessoa pode recuperar no máximo 10 HP por acionamento e 30 HP por minuto.

A explosão não apaga o ranking nem a fila. Depois que a arena é limpa, os jogadores que estavam aguardando começam a entrar nas vagas livres.

## Bots de espera

Quando a arena permanece por 10 segundos com menos de três entidades vivas, o jogo começa a sortear personagens da categoria baixa para `bot_1`, `bot_2` e `bot_3`. Cada reposição aguarda uma nova contagem de 10 segundos. Jogadores humanos e bots contam juntos para esse mínimo.

A área **Aguardando próximo jogador**, acima da arena, mostra a contagem no canto direito: 10–7 em azul, 6–4 em amarelo, 3–1 em vermelho e `SPAWN!!` em verde. A contagem não avança durante roletas, curas ou apresentações; uma nova contagem completa começa quando a tela volta ao estado de espera.

- existem no máximo três bots vivos;
- eles nunca recebem UPGRADE na roleta;
- dano e eliminações feitos por bots não geram pontos;
- bots nunca aparecem no ranking;
- dano e eliminações que jogadores humanos causarem nos bots valem pontos normalmente;
- com um humano sozinho, entram até dois bots; com dois humanos, entra no máximo um bot;
- jogadores que estiverem com roleta ou apresentação de entrada em andamento são aguardados antes de decidir se falta um bot;
- os bots que já estiverem na arena continuam até morrer, mesmo que novos humanos elevem o total acima de três.

## TikTok LIVE Studio

Use `http://127.0.0.1:8832/?mode=live` como fonte de link. A arena recebe os eventos automaticamente; não é necessário adicionar o overlay **My Screens** do TikFinity.

Se preferir controlar e transmitir exatamente a mesma janela, abra o endereço no navegador em tela cheia e use **Captura de janela** no LIVE Studio.
