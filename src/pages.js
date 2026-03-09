'use strict';

const SITE = 'https://grabbvideos.com';

/* ── Shared ad snippets ─────────────────────────────────────────────── */
function adBanner728() {
  return `
  <div class="my-6">
    <p class="ad-label">Advertisement</p>
    <div class="hidden md:flex justify-center">
      <script>atOptions={'key':'bdaf2212efd1c570eb92747dc8a4ae59','format':'iframe','height':90,'width':728,'params':{}};</script>
      <script src="https://www.highperformanceformat.com/bdaf2212efd1c570eb92747dc8a4ae59/invoke.js"></script>
    </div>
    <div class="flex md:hidden justify-center">
      <script>atOptions={'key':'3660345d7ec8fd060c0beee5d3e4928f','format':'iframe','height':50,'width':320,'params':{}};</script>
      <script src="https://www.highperformanceformat.com/3660345d7ec8fd060c0beee5d3e4928f/invoke.js"></script>
    </div>
  </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   PAGE DATA
══════════════════════════════════════════════════════════════════════ */
const PAGES = {

  /* ── Tool pages ────────────────────────────────────────────────── */
  tools: {
    'reels-downloader': {
      slug: 'reels-downloader',
      type: 'tool',
      canonical: `${SITE}/reels-downloader`,
      title: 'Instagram Reels Downloader — No Watermark, Free HD MP4 | GrabbVideos',
      description: 'Download Instagram Reels in HD MP4 with no watermark and no login. The fastest free Reels downloader in 2026. Works on iPhone, Android & PC.',
      h1: 'Instagram Reels Downloader',
      subtitle: 'Save any Reel in HD MP4 — no watermark, no account, no app.',
      ogImage: `${SITE}/og-image.png`,
      platform: 'instagram',
      inputPlaceholder: 'Paste Instagram Reel URL here…',
      howTo: [
        { step: 1, title: 'Open the Reel on Instagram', desc: 'Navigate to the Reel in the app or on instagram.com.' },
        { step: 2, title: 'Tap ··· → Copy Link', desc: 'On mobile tap the three-dot menu → Copy Link. On desktop, copy the URL from the address bar.' },
        { step: 3, title: 'Paste & click Grab Video', desc: 'Paste the link above and hit Grab Video. Processing takes 2–5 seconds.' },
        { step: 4, title: 'Click Download MP4', desc: 'Your HD Reel saves to your device — completely watermark-free.' },
      ],
      faq: [
        { q: 'Does this remove the TikTok / Instagram watermark?', a: 'Yes — GrabbVideos fetches the original source stream. No watermarks, logos, or overlays.' },
        { q: 'Does it work on iPhone?', a: 'Yes. Open Safari, paste the Reel URL, tap Grab Video, then long-press Download MP4 → Download Linked File to save to Files.' },
        { q: 'Does it work on Android?', a: 'Yes. Chrome downloads the MP4 directly to your Downloads folder.' },
        { q: 'Can I download private Reels?', a: 'No — only public content is accessible. Private accounts are fully protected.' },
        { q: 'What quality is the output?', a: 'GrabbVideos always selects the highest available quality, typically 1080p MP4.' },
      ],
    },

    'story-saver': {
      slug: 'story-saver',
      type: 'tool',
      canonical: `${SITE}/story-saver`,
      title: 'Instagram Story Saver — Download Stories Anonymously & Free | GrabbVideos',
      description: 'Download Instagram Stories as video or photo without the poster knowing. 100% anonymous, no login, free. Works on all devices.',
      h1: 'Instagram Story Saver',
      subtitle: 'Download Stories anonymously — videos & photos, no trace left.',
      ogImage: `${SITE}/og-image.png`,
      platform: 'instagram',
      inputPlaceholder: 'Paste Instagram Story or profile URL…',
      howTo: [
        { step: 1, title: 'Copy the Story or profile URL', desc: 'Open the Story on Instagram and copy the link, or use the profile URL to browse active Stories.' },
        { step: 2, title: 'Paste it above', desc: 'Drop the copied link into the input field and hit Grab Video.' },
        { step: 3, title: 'Download the Story media', desc: 'Click Download MP4 (or save the image). The uploader is never notified.' },
      ],
      faq: [
        { q: 'Will the account owner know I viewed their Story?', a: 'No. GrabbVideos downloads directly from Instagram\'s CDN — your account is never added to the viewer list.' },
        { q: 'Can I save Highlight Stories?', a: 'Yes. Paste the direct URL of a Highlight and GrabbVideos will fetch the media.' },
        { q: 'Do Stories expire?', a: 'Regular Stories disappear after 24 hours. You can only download them while they\'re still live. Highlights stay until removed by the creator.' },
        { q: 'Private account stories?', a: 'Not accessible — only public Stories can be downloaded without authentication.' },
      ],
    },

    'photo-downloader': {
      slug: 'photo-downloader',
      type: 'tool',
      canonical: `${SITE}/photo-downloader`,
      title: 'Instagram Photo Downloader — Save HD Photos Free | GrabbVideos',
      description: 'Download any Instagram photo in full HD resolution — no account, no watermark. Supports posts, carousels, and profile pictures.',
      h1: 'Instagram Photo Downloader',
      subtitle: 'Save Instagram photos in full HD — no account or watermark.',
      ogImage: `${SITE}/og-image.png`,
      platform: 'instagram',
      inputPlaceholder: 'Paste Instagram post URL here…',
      howTo: [
        { step: 1, title: 'Find the photo on Instagram', desc: 'Open the post containing the image you want to save, in the app or on the web.' },
        { step: 2, title: 'Copy the post link', desc: 'Tap ··· → Copy Link (mobile), or copy the URL from your browser address bar (desktop).' },
        { step: 3, title: 'Paste & grab', desc: 'Paste the URL above and click Grab Video — GrabbVideos extracts the highest-resolution media.' },
      ],
      faq: [
        { q: 'Can I download carousel posts?', a: 'Yes. Paste the post URL and GrabbVideos extracts the best-quality media from the carousel.' },
        { q: 'Full resolution?', a: 'Yes — GrabbVideos always requests the highest available resolution from Instagram.' },
        { q: 'Can I download profile pictures?', a: 'Paste the profile URL. Results depend on the account\'s privacy settings.' },
      ],
    },

    'video-downloader': {
      slug: 'video-downloader',
      type: 'tool',
      canonical: `${SITE}/video-downloader`,
      title: 'TikTok & Instagram Video Downloader — No Watermark | GrabbVideos',
      description: 'Download TikTok and Instagram videos in HD MP4 without watermark. Free, instant, works on all devices. Best video downloader 2026.',
      h1: 'Social Video Downloader',
      subtitle: 'Download TikTok & Instagram videos in HD — no watermark, free forever.',
      ogImage: `${SITE}/og-image.png`,
      platform: 'both',
      inputPlaceholder: 'Paste TikTok or Instagram video URL…',
      howTo: [
        { step: 1, title: 'Copy the video link', desc: 'Open TikTok or Instagram, find the video, and tap Share → Copy Link.' },
        { step: 2, title: 'Paste it above', desc: 'Drop the link into the input and hit Grab Video.' },
        { step: 3, title: 'Download HD MP4', desc: 'Click Download MP4 — the watermark-free video saves directly to your device.' },
      ],
      faq: [
        { q: 'What platforms are supported?', a: 'Instagram (Reels, Stories, Posts, IGTV) and TikTok. More platforms coming soon.' },
        { q: 'Is TikTok watermark removed?', a: 'Yes — the downloaded MP4 has no TikTok logo or username overlay.' },
        { q: 'Maximum video quality?', a: 'Up to 1080p HD, matching the original upload.' },
      ],
    },
  },

  /* ── i18n home pages ───────────────────────────────────────────── */
  i18n: {

    /* ── Portuguese ──────────────────────────────────────────────── */
    pt: {
      lang: 'pt',
      type: 'i18n',
      slug: 'pt',
      canonical: `${SITE}/pt`,
      title: 'Baixar Vídeos do Instagram e TikTok Sem Marca d\'Água Grátis | GrabbVideos',
      description: 'Baixe Reels, Stories e vídeos do Instagram e TikTok em MP4 HD sem marca d\'água e sem cadastro. Ferramenta 100% gratuita, segura e que funciona no celular e computador.',
      h1: 'Baixe Vídeos do Instagram e TikTok Sem Marca d\'Água',
      subtitle: 'Salve Reels, Stories e vídeos do TikTok em MP4 HD direto no seu dispositivo — sem conta, sem app, 100% gratuito.',
      ogImage: `${SITE}/og-image.png`,
      btnLabel: 'Baixar Vídeo',
      placeholder: 'Cole aqui o link do Instagram ou TikTok…',
      processing: 'Processando…',
      grabbing: 'Baixando seu vídeo…',
      videoReady: '✓ Vídeo pronto',
      downloadBtn: 'Baixar MP4',
      howToTitle: 'Como Baixar Vídeos do Instagram e TikTok',
      toolCardTitle: 'Cole o link do vídeo abaixo',
      toolCardSubtitle: 'Instagram Reels · Stories · Posts · TikTok',
      steps: [
        {
          title: 'Abra o vídeo no Instagram ou TikTok',
          desc: 'No aplicativo ou pelo navegador do celular, navegue até o Reel, Post, Story ou vídeo do TikTok que deseja salvar. O conteúdo precisa ser de um perfil público para que o download funcione.',
        },
        {
          title: 'Copie o link do vídeo',
          desc: 'No Instagram, toque nos três pontos (···) e selecione "Copiar Link". No TikTok, toque em "Compartilhar" e depois em "Copiar Link". No computador, basta copiar a URL diretamente da barra de endereços do navegador.',
        },
        {
          title: 'Cole o link e clique em "Baixar Vídeo"',
          desc: 'Acesse o GrabbVideos, cole o link copiado no campo de texto e pressione o botão "Baixar Vídeo". O sistema irá processar a solicitação em poucos segundos, identificando automaticamente a plataforma e a melhor qualidade disponível.',
        },
        {
          title: 'Salve o MP4 no seu dispositivo',
          desc: 'Quando o vídeo estiver pronto, clique em "Baixar MP4". O arquivo será salvo diretamente no seu celular ou computador em alta definição, sem marca d\'água e sem necessidade de login ou cadastro.',
        },
      ],
      features: [
        {
          title: 'Download Ultra Rápido',
          desc: 'O GrabbVideos processa seu pedido em segundos, sem filas de espera ou tempo de carregamento desnecessário. Nossa infraestrutura é otimizada para entregar o link de download o mais rápido possível, independente do tamanho do vídeo.',
        },
        {
          title: 'Sem Marca d\'Água',
          desc: 'Ao contrário do download padrão do TikTok, o GrabbVideos acessa a fonte original do vídeo, entregando um arquivo MP4 completamente limpo, sem nenhum logotipo ou marca d\'água sobreposto. O que você baixa é exatamente o que o criador publicou.',
        },
        {
          title: 'Sem Cadastro Necessário',
          desc: 'Não pedimos e-mail, senha ou qualquer dado pessoal. Basta colar o link e clicar em baixar — sem formulários, sem confirmação de conta, sem etapas desnecessárias. O processo inteiro leva menos de 30 segundos.',
        },
        {
          title: 'Funciona no iPhone e Android',
          desc: 'O GrabbVideos foi desenvolvido para funcionar perfeitamente em qualquer navegador móvel, incluindo Safari no iPhone e Chrome no Android. Não é necessário instalar nenhum aplicativo ou extensão — tudo acontece direto no browser.',
        },
        {
          title: 'Qualidade HD até 1080p',
          desc: 'Sempre selecionamos a resolução mais alta disponível para o vídeo solicitado, podendo chegar a 1080p Full HD. O arquivo entregue é um MP4 compatível com todos os dispositivos modernos, pronto para ser assistido offline ou editado.',
        },
        {
          title: '100% Seguro e Privado',
          desc: 'Nenhum link ou vídeo é armazenado em nossos servidores após o processamento. Todas as solicitações são tratadas em tempo real e descartadas imediatamente. Sua privacidade é nossa prioridade — consulte nossa Política de Privacidade para mais detalhes.',
        },
      ],
      faq: [
        {
          q: 'O GrabbVideos é realmente gratuito?',
          a: 'Sim, o GrabbVideos é 100% gratuito e sem limites de uso. Você pode baixar quantos vídeos quiser, sem assinar nenhum plano pago, sem cadastro e sem anúncios intrusivos. A ferramenta se mantém gratuita graças a pequenos anúncios discretos exibidos na página.',
        },
        {
          q: 'Como baixar vídeo do TikTok sem marca d\'água?',
          a: 'Basta copiar o link do vídeo no TikTok (toque em "Compartilhar" → "Copiar Link"), colar no GrabbVideos e clicar em "Baixar Vídeo". O GrabbVideos acessa diretamente a versão original do arquivo, que não possui a marca d\'água do TikTok, e entrega um MP4 limpo para você salvar.',
        },
        {
          q: 'Como baixar vídeos do Instagram no iPhone?',
          a: 'No iPhone, abra o Instagram e navegue até o vídeo ou Reel desejado. Toque nos três pontos (···) e selecione "Copiar Link". Em seguida, abra o Safari e acesse grabbvideos.com. Cole o link no campo indicado e toque em "Baixar Vídeo". Quando o download estiver pronto, toque em "Baixar MP4" e o vídeo será salvo nos arquivos do seu iPhone.',
        },
        {
          q: 'Como baixar vídeos do Instagram no Android?',
          a: 'No Android, copie o link do vídeo tocando em ··· → "Copiar Link" no Instagram, ou em "Compartilhar" → "Copiar Link" no TikTok. Abra o Chrome ou qualquer navegador e acesse grabbvideos.com. Cole o link e toque em "Baixar Vídeo". O arquivo MP4 será baixado automaticamente para a pasta "Downloads" do seu dispositivo.',
        },
        {
          q: 'É legal baixar vídeos do Instagram e TikTok?',
          a: 'Baixar vídeos para uso pessoal e offline é geralmente tolerado na maioria dos países, especialmente quando o conteúdo é de perfis públicos. No entanto, redistribuir, republicar ou usar comercialmente vídeos sem autorização do criador pode infringir direitos autorais. O GrabbVideos recomenda que os downloads sejam usados apenas para consumo pessoal, offline, e que você sempre respeite os créditos dos criadores de conteúdo.',
        },
        {
          q: 'O site GrabbVideos é seguro? Meus dados ficam protegidos?',
          a: 'Sim. O GrabbVideos não solicita nenhum dado pessoal e não armazena os links enviados após o processamento. Todo o processo é feito em tempo real: o link é recebido, o vídeo é localizado e o MP4 é entregue — sem guardar histórico. O site utiliza conexão HTTPS criptografada e não instala cookies de rastreamento além dos necessários para análise de tráfego anônima.',
        },
        {
          q: 'Preciso criar uma conta ou fazer cadastro?',
          a: 'Não. O GrabbVideos foi criado justamente para eliminar essa fricção. Não há cadastro, login, verificação de e-mail ou qualquer tipo de conta. Você acessa o site, cola o link e baixa o vídeo — simples assim. Nunca pediremos suas informações pessoais.',
        },
        {
          q: 'Qual é a qualidade do vídeo que vou receber?',
          a: 'O GrabbVideos sempre seleciona automaticamente a melhor qualidade disponível para cada vídeo, que pode chegar a Full HD (1080p). A qualidade final depende do que foi originalmente publicado pelo criador na plataforma — se o upload original foi em 720p, o download também será em 720p. O formato entregue é sempre MP4, compatível com todos os dispositivos.',
        },
        {
          q: 'Posso baixar vídeos de contas privadas?',
          a: 'Não. O GrabbVideos só consegue acessar conteúdos de perfis públicos, pois não realiza autenticação em nenhuma conta. Vídeos de perfis privados são protegidos pelas plataformas e não podem ser acessados por ferramentas de terceiros sem login, o que preserva a privacidade dos usuários.',
        },
        {
          q: 'Por que aparece o erro "Não foi possível baixar este vídeo"?',
          a: 'As causas mais comuns são: o perfil é privado, o vídeo foi apagado pelo criador, o link está incompleto ou o conteúdo é um Story que já expirou. Para evitar esse problema, certifique-se de copiar o link diretamente pelo botão "Compartilhar" → "Copiar Link" dentro do aplicativo, e não digitando a URL manualmente. Se o problema persistir, tente novamente em alguns minutos.',
        },
        {
          q: 'Funciona no computador (Windows e Mac)?',
          a: 'Sim. O GrabbVideos funciona em qualquer navegador moderno no computador, incluindo Google Chrome, Mozilla Firefox, Microsoft Edge e Safari no Mac. Basta acessar grabbvideos.com, copiar o link do vídeo da barra de endereços do Instagram ou TikTok, colar no campo e clicar em "Baixar Vídeo".',
        },
        {
          q: 'Quanto tempo leva para baixar um vídeo?',
          a: 'O processamento geralmente leva entre 2 e 5 segundos. Vídeos mais longos ou de maior resolução podem levar um pouco mais. Após clicar em "Baixar Vídeo", uma barra de progresso indicará o status em tempo real. O download do arquivo para o seu dispositivo depende também da velocidade da sua conexão com a internet.',
        },
      ],
    },

    /* ── English ─────────────────────────────────────────────────── */
    en: {
      lang: 'en',
      type: 'i18n',
      slug: 'en',
      canonical: `${SITE}/en`,
      title: 'Download Instagram & TikTok Videos Without Watermark Free | GrabbVideos',
      description: 'Download Instagram Reels, Stories, and TikTok videos in HD MP4 without watermark and without signup. 100% free, safe, works on iPhone, Android & PC.',
      h1: 'Download Instagram & TikTok Videos Without Watermark',
      subtitle: 'Save Reels, Stories and TikTok videos in HD MP4 — no account, no app, 100% free.',
      ogImage: `${SITE}/og-image.png`,
      btnLabel: 'Grab Video',
      placeholder: 'Paste Instagram or TikTok link here…',
      processing: 'Processing…',
      grabbing: 'Grabbing your video…',
      videoReady: '✓ Video ready',
      downloadBtn: 'Download MP4',
      howToTitle: 'How to Download Instagram & TikTok Videos',
      toolCardTitle: 'Paste the video link below',
      toolCardSubtitle: 'Instagram Reels · Stories · Posts · TikTok',
      steps: [
        {
          title: 'Open the video on Instagram or TikTok',
          desc: 'In the app or mobile browser, navigate to the Reel, Post, Story, or TikTok video you want to save. The content must come from a public profile for the download to work.',
        },
        {
          title: 'Copy the video link',
          desc: 'On Instagram, tap the three-dot menu (···) and select "Copy Link". On TikTok, tap "Share" then "Copy Link". On desktop, simply copy the URL directly from the browser address bar.',
        },
        {
          title: 'Paste the link and click "Grab Video"',
          desc: 'Go to GrabbVideos, paste the copied link into the text field, and press the "Grab Video" button. The system will process your request in just a few seconds, automatically detecting the platform and best available quality.',
        },
        {
          title: 'Save the MP4 to your device',
          desc: 'Once the video is ready, click "Download MP4". The file will be saved directly to your phone or computer in high definition — completely watermark-free and with no login or signup required.',
        },
      ],
      features: [
        {
          title: 'Lightning Fast Downloads',
          desc: 'GrabbVideos processes your request in seconds, with no waiting queues or unnecessary loading time. Our infrastructure is optimized to deliver your download link as quickly as possible, regardless of video size.',
        },
        {
          title: 'No Watermark',
          desc: 'Unlike TikTok\'s built-in save feature, GrabbVideos accesses the original video source, delivering a completely clean MP4 with no logo or watermark overlay. What you download is exactly what the creator published.',
        },
        {
          title: 'No Signup Required',
          desc: 'We never ask for your email, password, or any personal data. Just paste the link and click download — no forms, no account confirmation, no unnecessary steps. The entire process takes under 30 seconds.',
        },
        {
          title: 'Works on iPhone and Android',
          desc: 'GrabbVideos is built to work perfectly in any mobile browser, including Safari on iPhone and Chrome on Android. No app or extension needs to be installed — everything happens directly in your browser.',
        },
        {
          title: 'HD Quality up to 1080p',
          desc: 'We always select the highest available resolution for the requested video, up to 1080p Full HD. The delivered file is an MP4 compatible with all modern devices, ready to watch offline or edit.',
        },
        {
          title: '100% Safe and Private',
          desc: 'No links or videos are stored on our servers after processing. All requests are handled in real-time and discarded immediately. Your privacy is our priority — see our Privacy Policy for full details.',
        },
      ],
      faq: [
        {
          q: 'Is GrabbVideos really free?',
          a: 'Yes, GrabbVideos is 100% free with no usage limits. You can download as many videos as you want without signing up for any paid plan, creating an account, or dealing with intrusive ads. The tool stays free thanks to small, unobtrusive display ads shown on the page.',
        },
        {
          q: 'How do I download a TikTok video without a watermark?',
          a: 'Simply copy the video link on TikTok (tap "Share" → "Copy Link"), paste it into GrabbVideos, and click "Grab Video". GrabbVideos accesses the original version of the file directly — the one without the TikTok watermark — and delivers a clean MP4 for you to save.',
        },
        {
          q: 'How do I download Instagram videos on iPhone?',
          a: 'On iPhone, open Instagram and navigate to the video or Reel you want. Tap the three-dot menu (···) and select "Copy Link". Then open Safari and go to grabbvideos.com. Paste the link in the field and tap "Grab Video". When the download is ready, tap "Download MP4" and the video will be saved to your iPhone\'s Files app.',
        },
        {
          q: 'How do I download Instagram videos on Android?',
          a: 'On Android, copy the video link by tapping ··· → "Copy Link" on Instagram, or "Share" → "Copy Link" on TikTok. Open Chrome or any browser and go to grabbvideos.com. Paste the link and tap "Grab Video". The MP4 file will automatically download to the "Downloads" folder on your device.',
        },
        {
          q: 'Is it legal to download Instagram and TikTok videos?',
          a: 'Downloading videos for personal, offline viewing is generally accepted in most countries, especially for content from public profiles. However, redistributing, reposting, or commercially using videos without the creator\'s permission may infringe copyright. GrabbVideos recommends that downloads be used for personal consumption only, and that you always credit and respect the original content creators.',
        },
        {
          q: 'Is GrabbVideos safe? Is my data protected?',
          a: 'Yes. GrabbVideos does not request any personal data and does not store submitted links after processing. The entire process is done in real-time: the link is received, the video is located, and the MP4 is delivered — with no history kept. The site uses encrypted HTTPS connections and installs no tracking cookies beyond those required for anonymous traffic analytics.',
        },
        {
          q: 'Do I need to create an account or sign up?',
          a: 'No. GrabbVideos was built specifically to eliminate that friction. There is no signup, login, email verification, or account of any kind required. You visit the site, paste the link, and download the video — that\'s it. We will never ask for your personal information.',
        },
        {
          q: 'What quality will the downloaded video be?',
          a: 'GrabbVideos always automatically selects the best available quality for each video, which can reach Full HD (1080p). The final quality depends on what was originally published by the creator on the platform — if the original upload was 720p, the download will also be 720p. The delivered format is always MP4, compatible with all devices.',
        },
        {
          q: 'Can I download videos from private accounts?',
          a: 'No. GrabbVideos can only access content from public profiles, as it does not authenticate with any account. Videos from private profiles are protected by the platforms and cannot be accessed by third-party tools without login, which preserves user privacy.',
        },
        {
          q: 'Why does the error "Could not download this video" appear?',
          a: 'The most common causes are: the profile is private, the video was deleted by the creator, the link is incomplete, or the content is a Story that has already expired. To avoid this issue, always copy the link directly via the "Share" → "Copy Link" button within the app rather than typing the URL manually. If the problem persists, try again in a few minutes.',
        },
        {
          q: 'Does it work on desktop (Windows and Mac)?',
          a: 'Yes. GrabbVideos works in any modern browser on desktop, including Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari on Mac. Simply visit grabbvideos.com, copy the video link from the Instagram or TikTok address bar, paste it into the field, and click "Grab Video".',
        },
        {
          q: 'How long does it take to download a video?',
          a: 'Processing usually takes between 2 and 5 seconds. Longer or higher-resolution videos may take slightly more time. After clicking "Grab Video", a progress indicator will show real-time status. The actual download to your device also depends on the speed of your internet connection.',
        },
      ],
    },

    /* ── Spanish ─────────────────────────────────────────────────── */
    es: {
      lang: 'es',
      type: 'i18n',
      slug: 'es',
      canonical: `${SITE}/es`,
      title: 'Descargar Vídeos de Instagram y TikTok Sin Marca de Agua Gratis | GrabbVideos',
      description: 'Descarga Reels, Stories y vídeos de Instagram y TikTok en MP4 HD sin marca de agua y sin registro. Herramienta 100% gratuita, segura y compatible con móvil y PC.',
      h1: 'Descarga Vídeos de Instagram y TikTok Sin Marca de Agua',
      subtitle: 'Guarda Reels, Stories y vídeos de TikTok en MP4 HD directamente en tu dispositivo — sin cuenta, sin app, 100% gratis.',
      ogImage: `${SITE}/og-image.png`,
      btnLabel: 'Descargar Vídeo',
      placeholder: 'Pega el enlace de Instagram o TikTok aquí…',
      processing: 'Procesando…',
      grabbing: 'Descargando tu vídeo…',
      videoReady: '✓ Vídeo listo',
      downloadBtn: 'Descargar MP4',
      howToTitle: 'Cómo Descargar Vídeos de Instagram y TikTok',
      toolCardTitle: 'Pega el enlace del vídeo abajo',
      toolCardSubtitle: 'Instagram Reels · Stories · Posts · TikTok',
      steps: [
        {
          title: 'Abre el vídeo en Instagram o TikTok',
          desc: 'En la app o el navegador del móvil, navega hasta el Reel, Post, Story o vídeo de TikTok que deseas guardar. El contenido debe pertenecer a un perfil público para que la descarga funcione.',
        },
        {
          title: 'Copia el enlace del vídeo',
          desc: 'En Instagram, toca los tres puntos (···) y selecciona "Copiar enlace". En TikTok, toca "Compartir" y después "Copiar enlace". En el ordenador, copia la URL directamente de la barra de direcciones del navegador.',
        },
        {
          title: 'Pega el enlace y haz clic en "Descargar Vídeo"',
          desc: 'Accede a GrabbVideos, pega el enlace copiado en el campo de texto y pulsa el botón "Descargar Vídeo". El sistema procesará tu solicitud en pocos segundos, identificando automáticamente la plataforma y la mejor calidad disponible.',
        },
        {
          title: 'Guarda el MP4 en tu dispositivo',
          desc: 'Cuando el vídeo esté listo, haz clic en "Descargar MP4". El archivo se guardará directamente en tu móvil u ordenador en alta definición, completamente libre de marca de agua y sin necesidad de iniciar sesión o registrarse.',
        },
      ],
      features: [
        {
          title: 'Ultra Rápido',
          desc: 'GrabbVideos procesa tu solicitud en segundos, sin colas de espera ni tiempos de carga innecesarios. Nuestra infraestructura está optimizada para entregarte el enlace de descarga lo antes posible, independientemente del tamaño del vídeo.',
        },
        {
          title: 'Sin Marca de Agua',
          desc: 'A diferencia de la descarga estándar de TikTok, GrabbVideos accede a la fuente original del vídeo, entregando un archivo MP4 completamente limpio, sin ningún logotipo o marca de agua superpuesto. Lo que descargas es exactamente lo que el creador publicó.',
        },
        {
          title: 'Sin Registro',
          desc: 'Nunca pedimos correo electrónico, contraseña ni ningún dato personal. Solo pega el enlace y haz clic en descargar — sin formularios, sin confirmación de cuenta, sin pasos innecesarios. Todo el proceso lleva menos de 30 segundos.',
        },
        {
          title: 'Compatible con Móvil',
          desc: 'GrabbVideos está diseñado para funcionar perfectamente en cualquier navegador móvil, incluyendo Safari en iPhone y Chrome en Android. No es necesario instalar ninguna aplicación ni extensión — todo ocurre directamente en el navegador.',
        },
        {
          title: 'Calidad HD hasta 1080p',
          desc: 'Siempre seleccionamos la resolución más alta disponible para el vídeo solicitado, pudiendo llegar a Full HD 1080p. El archivo entregado es un MP4 compatible con todos los dispositivos modernos, listo para ver sin conexión o editar.',
        },
        {
          title: '100% Seguro y Privado',
          desc: 'Ningún enlace ni vídeo se almacena en nuestros servidores tras el procesamiento. Todas las solicitudes se gestionan en tiempo real y se descartan inmediatamente. Tu privacidad es nuestra prioridad — consulta nuestra Política de Privacidad para más información.',
        },
      ],
      faq: [
        {
          q: '¿GrabbVideos es realmente gratis?',
          a: 'Sí, GrabbVideos es 100% gratuito y sin límites de uso. Puedes descargar todos los vídeos que quieras sin suscribirte a ningún plan de pago, sin crear una cuenta y sin anuncios intrusivos. La herramienta se mantiene gratuita gracias a pequeños anuncios discretos que se muestran en la página.',
        },
        {
          q: '¿Cómo descargar un vídeo de TikTok sin marca de agua?',
          a: 'Solo tienes que copiar el enlace del vídeo en TikTok (toca "Compartir" → "Copiar enlace"), pegarlo en GrabbVideos y hacer clic en "Descargar Vídeo". GrabbVideos accede directamente a la versión original del archivo, que no tiene la marca de agua de TikTok, y te entrega un MP4 limpio para guardar.',
        },
        {
          q: '¿Cómo descargar vídeos de Instagram en iPhone?',
          a: 'En el iPhone, abre Instagram y navega hasta el vídeo o Reel deseado. Toca los tres puntos (···) y selecciona "Copiar enlace". Luego abre Safari y accede a grabbvideos.com. Pega el enlace en el campo indicado y toca "Descargar Vídeo". Cuando la descarga esté lista, toca "Descargar MP4" y el vídeo se guardará en los archivos de tu iPhone.',
        },
        {
          q: '¿Cómo descargar vídeos de Instagram en Android?',
          a: 'En Android, copia el enlace del vídeo tocando ··· → "Copiar enlace" en Instagram, o "Compartir" → "Copiar enlace" en TikTok. Abre Chrome o cualquier navegador y accede a grabbvideos.com. Pega el enlace y toca "Descargar Vídeo". El archivo MP4 se descargará automáticamente en la carpeta "Descargas" de tu dispositivo.',
        },
        {
          q: '¿Es legal descargar vídeos de Instagram y TikTok?',
          a: 'Descargar vídeos para uso personal y sin conexión es generalmente aceptado en la mayoría de los países, especialmente cuando el contenido es de perfiles públicos. Sin embargo, redistribuir, volver a publicar o usar comercialmente vídeos sin la autorización del creador puede infringir los derechos de autor. GrabbVideos recomienda que las descargas se usen solo para consumo personal y offline, respetando siempre los créditos de los creadores de contenido.',
        },
        {
          q: '¿Es seguro GrabbVideos? ¿Mis datos están protegidos?',
          a: 'Sí. GrabbVideos no solicita ningún dato personal y no almacena los enlaces enviados tras el procesamiento. Todo el proceso se realiza en tiempo real: el enlace se recibe, el vídeo se localiza y el MP4 se entrega, sin guardar ningún historial. El sitio utiliza conexión HTTPS cifrada y no instala cookies de seguimiento más allá de las necesarias para el análisis de tráfico anónimo.',
        },
        {
          q: '¿Necesito crear una cuenta o registrarme?',
          a: 'No. GrabbVideos fue creado precisamente para eliminar esa fricción. No hay registro, inicio de sesión, verificación de correo electrónico ni ningún tipo de cuenta. Accedes al sitio, pegas el enlace y descargas el vídeo, así de sencillo. Nunca pediremos tu información personal.',
        },
        {
          q: '¿Qué calidad tendrá el vídeo descargado?',
          a: 'GrabbVideos siempre selecciona automáticamente la mejor calidad disponible para cada vídeo, que puede llegar a Full HD (1080p). La calidad final depende de lo que publicó originalmente el creador en la plataforma; si la subida original fue en 720p, la descarga también será en 720p. El formato entregado es siempre MP4, compatible con todos los dispositivos.',
        },
        {
          q: '¿Puedo descargar vídeos de cuentas privadas?',
          a: 'No. GrabbVideos solo puede acceder a contenidos de perfiles públicos, ya que no realiza autenticación en ninguna cuenta. Los vídeos de perfiles privados están protegidos por las plataformas y no pueden ser accedidos por herramientas de terceros sin inicio de sesión, lo que preserva la privacidad de los usuarios.',
        },
        {
          q: '¿Por qué aparece el error "No se pudo descargar este vídeo"?',
          a: 'Las causas más comunes son: el perfil es privado, el vídeo fue eliminado por el creador, el enlace está incompleto o el contenido es un Story que ya ha expirado. Para evitar este problema, asegúrate de copiar el enlace directamente desde el botón "Compartir" → "Copiar enlace" dentro de la app, y no escribiendo la URL manualmente. Si el problema persiste, inténtalo de nuevo en unos minutos.',
        },
        {
          q: '¿Funciona en ordenador (Windows y Mac)?',
          a: 'Sí. GrabbVideos funciona en cualquier navegador moderno del ordenador, incluyendo Google Chrome, Mozilla Firefox, Microsoft Edge y Safari en Mac. Solo tienes que acceder a grabbvideos.com, copiar el enlace del vídeo de la barra de direcciones de Instagram o TikTok, pegarlo en el campo y hacer clic en "Descargar Vídeo".',
        },
        {
          q: '¿Cuánto tiempo tarda en descargar un vídeo?',
          a: 'El procesamiento suele tardar entre 2 y 5 segundos. Los vídeos más largos o de mayor resolución pueden tardar un poco más. Después de hacer clic en "Descargar Vídeo", un indicador de progreso mostrará el estado en tiempo real. La descarga del archivo en tu dispositivo también depende de la velocidad de tu conexión a Internet.',
        },
      ],
    },

  },
};

// Permite que o arquivo seja lido tanto pelo Node.js (servidor) quanto pelo navegador
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PAGES;
}