/**
 * QUIZ BÍBLICO · Banco de perguntas — JONAS (50 questões)
 * 15 fáceis · 20 médias · 15 difíceis · Capítulos 1 a 4
 * Todas as perguntas, alternativas, explicações e dicas referem-se
 * exclusivamente ao livro de Jonas.
 */

const uuid = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`;

export const JONAS_QUESTIONS = [
  // ================================================================ FÁCEIS
  {
    id: uuid('030000000101'), book_id: 'jonas', chapter: 1, difficulty: 'facil', order_index: 1, source_type: 'texto_biblico',
    question: 'Quem era o pai do profeta Jonas?',
    option_a: 'Amitai', option_b: 'Beeri', option_c: 'Joás', option_d: 'Diblaim',
    correct_answer: 'A',
    explanation:
      'Jonas 1:1: "Veio a palavra do Senhor a Jonas, filho de Amitai." O mesmo profeta é citado em 2 Reis 14:25, onde profetizou a restauração das fronteiras de Israel nos dias de Jeroboão II.',
    hint: 'O nome aparece logo no primeiro versículo do livro.',
  },
  {
    id: uuid('030000000102'), book_id: 'jonas', chapter: 1, difficulty: 'facil', order_index: 2, source_type: 'texto_biblico',
    question: 'O que Deus mandou Jonas fazer em Nínive?',
    option_a: 'Morar lá como estrangeiro', option_b: 'Clamar contra ela', option_c: 'Comprar terras', option_d: 'Casar-se lá',
    correct_answer: 'B',
    explanation:
      'Jonas 1:2: "Levanta-te, vai à grande cidade de Nínive e clama contra ela, porque a sua maldade subiu até mim." Clamar contra a cidade era anunciar o juízo de Deus sobre seus pecados.',
    hint: 'Era anunciar em alta voz o juízo de Deus.',
  },
  {
    id: uuid('030000000103'), book_id: 'jonas', chapter: 1, difficulty: 'facil', order_index: 3, source_type: 'texto_biblico',
    question: 'Para onde Jonas fugiu, em vez de ir a Nínive?',
    option_a: 'Para o Egito', option_b: 'Para Damasco', option_c: 'Para Társis', option_d: 'Para a Babilônia',
    correct_answer: 'C',
    explanation:
      'Jonas 1:3: Jonas "se levantou para fugir de diante do Senhor, para Társis." Nínive ficava a nordeste; Társis, porto distante no oeste (possivelmente na Espanha): Jonas foi para a direção oposta.',
    hint: 'Era um porto distante no oeste, na direção contrária.',
  },
  {
    id: uuid('030000000104'), book_id: 'jonas', chapter: 1, difficulty: 'facil', order_index: 4, source_type: 'texto_biblico',
    question: 'De qual porto Jonas partiu de navio?',
    option_a: 'Jope', option_b: 'Tiro', option_c: 'Sidom', option_d: 'Gaza',
    correct_answer: 'A',
    explanation:
      'Jonas 1:3: Jonas "desceu a Jope, e achou um navio que ia para Társis; pagou a passagem e embarcou nele." Jope (a atual Jafa) era o porto do litoral de Israel.',
    hint: 'É o porto do litoral de Israel, hoje chamado Jafa.',
  },
  {
    id: uuid('030000000105'), book_id: 'jonas', chapter: 1, difficulty: 'facil', order_index: 5, source_type: 'texto_biblico',
    question: 'O que o Senhor lançou sobre o mar contra o navio de Jonas?',
    option_a: 'Uma chuva de pedras', option_b: 'Um grande vento (tempestade)', option_c: 'Uma escuridão de três dias', option_d: 'Um exército de gafanhotos',
    correct_answer: 'B',
    explanation:
      'Jonas 1:4: "Mas o Senhor lançou sobre o mar um forte vento, e fez-se no mar uma grande tempestade, e o navio estava a ponto de quebrar-se." A tempestade era a disciplina de Deus para alcançar o profeta fujão.',
    hint: 'Foi uma grande tempestade que quase quebrou o navio.',
  },
  {
    id: uuid('030000000106'), book_id: 'jonas', chapter: 1, difficulty: 'facil', order_index: 6, source_type: 'texto_biblico',
    question: 'O que engoliu Jonas depois que ele foi lançado ao mar?',
    option_a: 'Um tubarão', option_b: 'Uma baleia pequena', option_c: 'Um grande peixe', option_d: 'Um crocodilo',
    correct_answer: 'C',
    explanation:
      'Jonas 1:17: "O Senhor deparou um grande peixe, para que tragasse a Jonas." O texto diz "grande peixe" (não especifica a espécie): Deus o preparou como instrumento de juízo e de livramento ao mesmo tempo.',
    hint: 'O texto diz apenas que era "grande".',
  },
  {
    id: uuid('030000000107'), book_id: 'jonas', chapter: 1, difficulty: 'facil', order_index: 7, source_type: 'texto_biblico',
    question: 'Quanto tempo Jonas ficou dentro do peixe?',
    option_a: 'Um dia e uma noite', option_b: 'Sete dias', option_c: 'Três dias e três noites', option_d: 'Quarenta dias',
    correct_answer: 'C',
    explanation:
      'Jonas 1:17: "esteve Jonas três dias e três noites no ventre do peixe." Jesus apontou esse episódio como sinal da sua morte e ressurreição (Mateus 12:40).',
    hint: 'É o mesmo número de dias de Jesus no túmulo.',
  },
  {
    id: uuid('030000000108'), book_id: 'jonas', chapter: 3, difficulty: 'facil', order_index: 8, source_type: 'texto_biblico',
    question: 'Em quantos dias Nínive seria subvertida, segundo a pregação de Jonas?',
    option_a: 'Três dias', option_b: 'Sete dias', option_c: 'Doze dias', option_d: 'Quarenta dias',
    correct_answer: 'D',
    explanation:
      'Jonas 3:4: "Ainda quarenta dias, e Nínive será subvertida." Quarenta é número frequente de prova na Bíblia (dilúvio, Sinai, deserto, jejum de Jesus).',
    hint: 'É o mesmo número dos dias do dilúvio e do jejum de Jesus.',
  },
  {
    id: uuid('030000000109'), book_id: 'jonas', chapter: 3, difficulty: 'facil', order_index: 9, source_type: 'texto_biblico',
    question: 'Como os ninivitas reagiram à pregação de Jonas?',
    option_a: 'Expulsaram o profeta da cidade', option_b: 'Creram em Deus, jejuaram e se vestiram de saco', option_c: 'Ignoraram e continuaram festejando', option_d: 'Prenderam Jonas por três dias',
    correct_answer: 'B',
    explanation:
      'Jonas 3:5: "Os ninivitas creram em Deus, e proclamaram um jejum, e vestiram-se de panos de saco, desde o maior até ao menor." Foi um dos maiores arrependimentos coletivos registrados na Bíblia.',
    hint: 'Eles creram, jejuaram e se humilharam.',
  },
  {
    id: uuid('030000000110'), book_id: 'jonas', chapter: 4, difficulty: 'facil', order_index: 10, source_type: 'texto_biblico',
    question: 'Quantos capítulos tem o livro de Jonas?',
    option_a: 'Dois', option_b: 'Quatro', option_c: 'Seis', option_d: 'Doze',
    correct_answer: 'B',
    explanation:
      'Jonas tem 4 capítulos: 1) a fuga e a tempestade; 2) a oração no ventre do peixe; 3) a pregação e o arrependimento de Nínive; 4) a ira de Jonas e a lição da planta.',
    hint: 'É um dos livros mais curtos dos Profetas Menores.',
  },
  {
    id: uuid('030000000111'), book_id: 'jonas', chapter: 2, difficulty: 'facil', order_index: 11, source_type: 'texto_biblico',
    question: 'Complete Jonas 2:9: "A salvação vem do ___".',
    option_a: 'mar', option_b: 'Senhor', option_c: 'rei', option_d: 'profeta',
    correct_answer: 'B',
    explanation:
      'Jonas 2:9: "eu, com a voz do agradecimento, te oferecerei sacrifício; o que votei pagarei. Ao Senhor pertence a salvação!" No fundo do mar, Jonas confessou que só Deus salva.',
    hint: 'É a grande confissão do livro: só Deus salva.',
  },
  {
    id: uuid('030000000112'), book_id: 'jonas', chapter: 1, difficulty: 'facil', order_index: 12, source_type: 'texto_biblico',
    question: 'O que os marinheiros lançaram para descobrir quem era o culpado pela tempestade?',
    option_a: 'Redes', option_b: 'Âncoras', option_c: 'Sortes', option_d: 'Flechas',
    correct_answer: 'C',
    explanation:
      'Jonas 1:7: "Vinde, e lancemos sortes, para que saibamos por causa de quem nos sobreveio este mal." Lançar sortes era um modo antigo de buscar a resposta de Deus (como em Provérbios 16:33).',
    hint: 'Era um sorteio para revelar a vontade de Deus.',
  },
  {
    id: uuid('030000000113'), book_id: 'jonas', chapter: 1, difficulty: 'facil', order_index: 13, source_type: 'texto_biblico',
    question: 'O que Jonas disse aos marinheiros para fazerem com ele?',
    option_a: 'Que o amarrassem ao mastro', option_b: 'Que o lançassem ao mar', option_c: 'Que o levassem de volta a Jope', option_d: 'Que o escondessem no porão',
    correct_answer: 'B',
    explanation:
      'Jonas 1:12: "Levantai-me e lançai-me ao mar, e o mar se aquietará." Jonas sabia que a tempestade viera por sua causa e se ofereceu para salvar a tripulação.',
    hint: 'Ele se ofereceu para salvar os companheiros.',
  },
  {
    id: uuid('030000000114'), book_id: 'jonas', chapter: 3, difficulty: 'facil', order_index: 14, source_type: 'texto_biblico',
    question: 'Ao ouvir a pregação, o rei de Nínive se cobriu de saco e se assentou…',
    option_a: 'no trono de ouro', option_b: 'na cinza', option_c: 'no templo', option_d: 'no alto do muro',
    correct_answer: 'B',
    explanation:
      'Jonas 3:6: o rei "levantou-se do seu trono, tirou de si as vestes reais, cobriu-se de saco e assentou-se sobre cinza." Do trono à cinza: o maior da cidade se humilhou como o menor.',
    hint: 'É o pó cinzento símbolo de luto e arrependimento.',
  },
  {
    id: uuid('030000000115'), book_id: 'jonas', chapter: 4, difficulty: 'facil', order_index: 15, source_type: 'texto_biblico',
    question: 'Quantas pessoas havia na grande cidade de Nínive, segundo Jonas 4:11?',
    option_a: 'Cerca de doze mil', option_b: 'Mais de cento e vinte mil', option_c: 'Exatamente quarenta mil', option_d: 'Cerca de três mil',
    correct_answer: 'B',
    explanation:
      'Jonas 4:11: "não hei de eu ter compaixão da grande cidade de Nínive, em que há mais de cento e vinte mil pessoas?" É com esse número — e com "muitos animais" — que Deus encerra o livro, defendendo sua misericórdia.',
    hint: 'Eram mais de cem mil pessoas.',
  },

  // ================================================================ MÉDIAS
  {
    id: uuid('030000000201'), book_id: 'jonas', chapter: 1, difficulty: 'medio', order_index: 16, source_type: 'texto_biblico',
    question: 'Como Nínive é chamada em Jonas 1:2?',
    option_a: 'Cidade santa', option_b: 'Grande cidade', option_c: 'Cidade fortificada', option_d: 'Cidade dos reis',
    correct_answer: 'B',
    explanation:
      'Jonas 1:2: "vai à grande cidade de Nínive." A expressão "grande cidade" se repete em 3:2-3 e 4:11, ressaltando a importância da missão: Deus se importava até com a capital inimiga.',
    hint: 'O adjetivo destaca o tamanho e a importância dela.',
  },
  {
    id: uuid('030000000202'), book_id: 'jonas', chapter: 1, difficulty: 'medio', order_index: 17, source_type: 'texto_biblico',
    question: 'Por que Jonas devia clamar contra Nínive?',
    option_a: 'Porque a cidade era pobre', option_b: 'Porque sua maldade subiu até Deus', option_c: 'Porque faltava água lá', option_d: 'Porque o rei pedira um profeta',
    correct_answer: 'B',
    explanation:
      'Jonas 1:2: "porque a sua maldade subiu até mim." Nínive, capital da Assíria, era famosa pela crueldade — e Deus, que vê todas as nações, a chamou a contas.',
    hint: 'O motivo subiu até Deus como um mau cheiro.',
  },
  {
    id: uuid('030000000203'), book_id: 'jonas', chapter: 1, difficulty: 'medio', order_index: 18, source_type: 'texto_biblico',
    question: 'O que os marinheiros fizeram com a carga do navio durante a tempestade?',
    option_a: 'Venderam aos passageiros', option_b: 'Lançaram ao mar para aliviar o navio', option_c: 'Esconderam no porão', option_d: 'Ofereceram aos deuses',
    correct_answer: 'B',
    explanation:
      'Jonas 1:5: os marinheiros "lançaram ao mar a carga que estava no navio, para o aliviarem." Mesmo pagãos, agiram com prudência — enquanto o profeta dormia no porão.',
    hint: 'Eles aliviaram o peso do navio.',
  },
  {
    id: uuid('030000000204'), book_id: 'jonas', chapter: 1, difficulty: 'medio', order_index: 19, source_type: 'texto_biblico',
    question: 'Onde estava Jonas enquanto a tempestade ameaçava o navio?',
    option_a: 'Orando no convés', option_b: 'Ajudando os marinheiros', option_c: 'Dormindo no porão do navio', option_d: 'Olhando o horizonte na proa',
    correct_answer: 'C',
    explanation:
      'Jonas 1:5: Jonas "desceu ao porão do navio; deitou-se e dormia profundamente." O contraste é proposital: os pagãos clamavam aos seus deuses, e o profeta do Deus verdadeiro dormia.',
    hint: 'Ele desceu e dormia profundamente.',
  },
  {
    id: uuid('030000000205'), book_id: 'jonas', chapter: 1, difficulty: 'medio', order_index: 20, source_type: 'texto_biblico',
    question: 'O que o capitão do navio disse a Jonas?',
    option_a: '"Paga a tua passagem!"', option_b: '"Levanta-te, invoca o teu Deus!"', option_c: '"Assume o leme do navio!"', option_d: '"Salta do navio agora!"',
    correct_answer: 'B',
    explanation:
      'Jonas 1:6: "Que tens, ó tu que dormes? Levanta-te, invoca o teu Deus! Talvez Deus se lembre de nós, para que não pereçamos." O capitão pagão pregou ao profeta: em crise, clame a Deus.',
    hint: 'Ele mandou o dorminhoco orar.',
  },
  {
    id: uuid('030000000206'), book_id: 'jonas', chapter: 1, difficulty: 'medio', order_index: 21, source_type: 'texto_biblico',
    question: 'Complete Jonas 1:9: "Eu sou ___, e temo ao Senhor".',
    option_a: 'profeta', option_b: 'hebreu', option_c: 'pescador', option_d: 'estrangeiro',
    correct_answer: 'B',
    explanation:
      'Jonas 1:9: "Eu sou hebreu e temo ao Senhor, o Deus do céu, que fez o mar e a terra." "Hebreu" era o nome pelo qual os israelitas se apresentavam aos estrangeiros.',
    hint: 'É o nome do povo de Israel diante dos estrangeiros.',
  },
  {
    id: uuid('030000000207'), book_id: 'jonas', chapter: 1, difficulty: 'medio', order_index: 22, source_type: 'texto_biblico',
    question: 'Como Jonas descreveu o Deus a quem temia?',
    option_a: 'Deus do céu, que fez o mar e a terra', option_b: 'Deus dos montes somente', option_c: 'Deus dos venezianos', option_d: 'Deus que mora no templo',
    correct_answer: 'A',
    explanation:
      'Jonas 1:9: "o Deus do céu, que fez o mar e a terra." A confissão é irônica: Jonas cria num Deus criador do mar — e tentava fugir dele pelo mar.',
    hint: 'Ele é o Criador de tudo, inclusive do mar revolto.',
  },
  {
    id: uuid('030000000208'), book_id: 'jonas', chapter: 1, difficulty: 'medio', order_index: 23, source_type: 'texto_biblico',
    question: 'Antes de lançar Jonas ao mar, o que os marinheiros tentaram fazer?',
    option_a: 'Esperar a tempestade passar', option_b: 'Remar para alcançar a terra', option_c: 'Oferecer ouro ao mar', option_d: 'Voltar para Jope velejando',
    correct_answer: 'B',
    explanation:
      'Jonas 1:13: "os homens remavam, esforçando-se por alcançar a terra, mas não podiam, porque o mar se ia tornando cada vez mais tempestuoso." Os pagãos mostraram mais misericórdia que o profeta mostrara a Nínive.',
    hint: 'Eles se esforçaram com os remos.',
  },
  {
    id: uuid('030000000209'), book_id: 'jonas', chapter: 1, difficulty: 'medio', order_index: 24, source_type: 'texto_biblico',
    question: 'Depois que o mar se acalmou, o que os marinheiros fizeram?',
    option_a: 'Fugiram para Társis', option_b: 'Temeram ao Senhor e lhe ofereceram sacrifício e votos', option_c: 'Jogaram Jonas de volta ao mar', option_d: 'Queimaram o navio em gratidão',
    correct_answer: 'B',
    explanation:
      'Jonas 1:16: "Temeram, pois, estes homens em extremo ao Senhor; ofereceram sacrifícios ao Senhor e fizeram votos." O profeta fujão acabou evangelizando a tripulação: os marinheiros se converteram ao Senhor.',
    hint: 'Eles se converteram: temeram, sacrificaram e prometeram.',
  },
  {
    id: uuid('030000000210'), book_id: 'jonas', chapter: 2, difficulty: 'medio', order_index: 25, source_type: 'texto_biblico',
    question: 'De onde Jonas orou a oração do capítulo 2?',
    option_a: 'Do convés do navio', option_b: 'Do ventre do peixe', option_c: 'Da praia de Jope', option_d: 'Do templo de Jerusalém',
    correct_answer: 'B',
    explanation:
      'Jonas 2:1: "Jonas orou ao Senhor, seu Deus, do ventre do peixe." A oração é um salmo de gratidão cheio de citações dos Salmos — prova de que Jonas conhecia as Escrituras.',
    hint: 'Foi do lugar mais improvável: dentro do peixe.',
  },
  {
    id: uuid('030000000211'), book_id: 'jonas', chapter: 2, difficulty: 'medio', order_index: 26, source_type: 'texto_biblico',
    question: 'Complete Jonas 2:2: "Na minha ___ clamei ao Senhor, e ele me respondeu".',
    option_a: 'alegria', option_b: 'angústia', option_c: 'velhice', option_d: 'festa',
    correct_answer: 'B',
    explanation:
      'Jonas 2:2: "Na minha angústia, clamei ao Senhor, e ele me respondeu; do ventre do abismo, gritei, e tu me ouviste a voz." Deus ouve até no fundo do mar.',
    hint: 'É o aperto que nos faz clamar.',
  },
  {
    id: uuid('030000000212'), book_id: 'jonas', chapter: 2, difficulty: 'medio', order_index: 27, source_type: 'texto_biblico',
    question: 'Segundo Jonas 2:5, o que se enrolou na cabeça de Jonas?',
    option_a: 'Redes de pesca', option_b: 'Algas', option_c: 'Cordas do navio', option_d: 'Cabelos de náufragos',
    correct_answer: 'B',
    explanation:
      'Jonas 2:5: "As águas me cercaram até à alma, o abismo me rodeou; e as algas se enrolaram na minha cabeça." O detalhe mostra que Jonas realmente desceu ao fundo do mar antes de ser tragado.',
    hint: 'São as plantas do fundo do mar.',
  },
  {
    id: uuid('030000000213'), book_id: 'jonas', chapter: 2, difficulty: 'medio', order_index: 28, source_type: 'texto_biblico',
    question: 'Complete Jonas 2:9: "o que votei ___".',
    option_a: 'esquecerei', option_b: 'pagarei', option_c: 'cantarei', option_d: 'esconderei',
    correct_answer: 'B',
    explanation:
      'Jonas 2:9: "o que votei pagarei." No ventre do peixe, Jonas renovou seus votos a Deus — e Deus lhe deu uma segunda chance: o peixe o vomitou em terra (2:10).',
    hint: 'Voto feito a Deus precisa ser cumprido.',
  },
  {
    id: uuid('030000000214'), book_id: 'jonas', chapter: 2, difficulty: 'medio', order_index: 29, source_type: 'texto_biblico',
    question: 'Como Jonas saiu do ventre do peixe?',
    option_a: 'Nadou até a praia', option_b: 'O peixe o vomitou na terra', option_c: 'Pescadores o resgataram', option_d: 'O peixe o levou até Nínive',
    correct_answer: 'B',
    explanation:
      'Jonas 2:10: "Falou, pois, o Senhor ao peixe, e este vomitou a Jonas na terra." Até o peixe obedece à voz do Senhor — contraste com o profeta, que precisou aprender a obedecer.',
    hint: 'O peixe obedeceu à ordem de Deus.',
  },
  {
    id: uuid('030000000215'), book_id: 'jonas', chapter: 3, difficulty: 'medio', order_index: 30, source_type: 'texto_biblico',
    question: 'Qual era a extensão de Nínive, segundo Jonas 3:3?',
    option_a: 'Um dia de caminho', option_b: 'Três dias de caminho', option_c: 'Sete dias de caminho', option_d: 'Uma hora de caminho',
    correct_answer: 'B',
    explanation:
      'Jonas 3:3: "Ora, Nínive era cidade mui grande, de três dias para percorrê-la." A grandeza da cidade realça a grandeza do arrependimento — e Jonas pregou andando apenas um dia (3:4).',
    hint: 'Era uma cidade de três dias de travessia.',
  },
  {
    id: uuid('030000000216'), book_id: 'jonas', chapter: 3, difficulty: 'medio', order_index: 31, source_type: 'texto_biblico',
    question: 'Quem em Nínive se vestiu de saco, segundo Jonas 3:5?',
    option_a: 'Somente os sacerdotes', option_b: 'Desde o maior até o menor', option_c: 'Somente as mulheres', option_d: 'Somente os estrangeiros',
    correct_answer: 'B',
    explanation:
      'Jonas 3:5: vestiram-se de saco "desde o maior até ao menor deles." O arrependimento alcançou todas as classes: do rei (3:6) ao mais humilde — e até os animais (3:7-8).',
    hint: 'Foi do rei ao mais humilde.',
  },
  {
    id: uuid('030000000217'), book_id: 'jonas', chapter: 3, difficulty: 'medio', order_index: 32, source_type: 'texto_biblico',
    question: 'No decreto do rei de Nínive, quem deveria jejuar e se cobrir de saco?',
    option_a: 'Somente os homens livres', option_b: 'Homens e animais', option_c: 'Somente os soldados', option_d: 'Somente os profetas',
    correct_answer: 'B',
    explanation:
      'Jonas 3:7-8: "Nem homens, nem animais, nem bois, nem ovelhas provem coisa alguma... mas sejam cobertos de saco, tanto homens como animais." Até os animais participaram do luto — sinal da seriedade do arrependimento.',
    hint: 'O decreto alcançou até os bichos.',
  },
  {
    id: uuid('030000000218'), book_id: 'jonas', chapter: 4, difficulty: 'medio', order_index: 33, source_type: 'texto_biblico',
    question: 'Por que Jonas fugiu para Társis, segundo ele mesmo confessa em 4:2?',
    option_a: 'Porque tinha medo do mar', option_b: 'Porque sabia que Deus é misericordioso e perdoaria Nínive', option_c: 'Porque não sabia o caminho', option_d: 'Porque estava doente',
    correct_answer: 'B',
    explanation:
      'Jonas 4:2: "sabia que és Deus clemente, e misericordioso, e tardio em irar-se, e grande em benignidade." Jonas fugiu não por medo dos assírios, mas por medo da misericórdia: não queria que Deus perdoasse os inimigos de Israel.',
    hint: 'Ele conhecia bem o coração perdoador de Deus.',
  },
  {
    id: uuid('030000000219'), book_id: 'jonas', chapter: 4, difficulty: 'medio', order_index: 34, source_type: 'texto_biblico',
    question: 'O que Deus preparou para dar sombra a Jonas a leste de Nínive?',
    option_a: 'Uma nuvem', option_b: 'Uma planta (aboboreira/ricino)', option_c: 'Uma tenda de couro', option_d: 'Uma figueira velha',
    correct_answer: 'B',
    explanation:
      'Jonas 4:6: "Deus preparou uma planta (kikayon, traduzida como aboboreira ou rícino), que subiu por cima de Jonas, para que fizesse sombra sobre sua cabeça." Jonas se alegrou muito — preparando a lição final do livro.',
    hint: 'Foi uma planta que cresceu depressa sobre ele.',
  },
  {
    id: uuid('030000000220'), book_id: 'jonas', chapter: 4, difficulty: 'medio', order_index: 35, source_type: 'texto_biblico',
    question: 'Vendo que Deus perdoara Nínive, como Jonas se sentiu?',
    option_a: 'Alegre e grato', option_b: 'Desgostoso e irado', option_c: 'Indiferente', option_d: 'Com medo do rei',
    correct_answer: 'B',
    explanation:
      'Jonas 4:1: "Com isso, desgostou-se Jonas extremamente e ficou irado." O pregador do arrependimento se irou com o sucesso da própria pregação — o coração do livro é essa contradição de Jonas.',
    hint: 'Ele se irou com a misericórdia de Deus.',
  },

  // =============================================================== DIFÍCEIS
  {
    id: uuid('030000000301'), book_id: 'jonas', chapter: 1, difficulty: 'dificil', order_index: 36, source_type: 'texto_biblico',
    question: 'O que Jonas pagou ao embarcar no navio para Társis?',
    option_a: 'Um tributo ao capitão', option_b: 'A passagem (o frete)', option_c: 'Uma oferta aos deuses', option_d: 'O dobro do preço da carga',
    correct_answer: 'B',
    explanation:
      'Jonas 1:3: Jonas "pagou a passagem e embarcou nele." Fugir de Deus sempre tem um preço: Jonas pagou a passagem, perdeu a carga dos outros, quase perdeu a vida — e ainda precisou aprender a lição.',
    hint: 'Fugir de Deus sempre custa caro: ele pagou para embarcar.',
  },
  {
    id: uuid('030000000302'), book_id: 'jonas', chapter: 1, difficulty: 'dificil', order_index: 37, source_type: 'texto_biblico',
    question: 'Sobre quem caiu a sorte lançada pelos marinheiros?',
    option_a: 'Sobre o capitão', option_b: 'Sobre Jonas', option_c: 'Sobre o passageiro mais rico', option_d: 'Sobre ninguém, repetiram o sorteio',
    correct_answer: 'B',
    explanation:
      'Jonas 1:7: "lançaram sortes... e a sorte caiu sobre Jonas." Deus dirigiu o sorteio para expor o profeta fujão — como diz Provérbios 16:33, "a sorte se lança no regaço, mas do Senhor procede toda a decisão."',
    hint: 'Deus dirigiu o sorteio para expor o culpado.',
  },
  {
    id: uuid('030000000303'), book_id: 'jonas', chapter: 2, difficulty: 'dificil', order_index: 38, source_type: 'texto_biblico',
    question: 'Complete Jonas 2:5: "As águas me cercaram até à ___".',
    option_a: 'cintura', option_b: 'alma', option_c: 'cabeça apenas', option_d: 'proa do navio',
    correct_answer: 'B',
    explanation:
      'Jonas 2:5: "As águas me cercaram até à alma, o abismo me rodeou." A linguagem é a dos salmos de aflição (Salmos 69:1): Jonas descreve a morte iminente antes do livramento.',
    hint: 'As águas chegaram ao mais profundo do seu ser.',
  },
  {
    id: uuid('030000000304'), book_id: 'jonas', chapter: 2, difficulty: 'dificil', order_index: 39, source_type: 'texto_biblico',
    question: 'Complete Jonas 2:6: "Desci até aos ___ dos montes".',
    option_a: 'pés', option_b: 'fundamentos', option_c: 'vales', option_d: 'rios',
    correct_answer: 'B',
    explanation:
      'Jonas 2:6: "Desci até aos fundamentos dos montes; a terra encerrou-me para sempre com os seus ferrolhos." Jonas desceu ao mais fundo — e de lá Deus "fez subir da sepultura" a sua vida.',
    hint: 'É a base mais funda, onde os montes se apoiam.',
  },
  {
    id: uuid('030000000305'), book_id: 'jonas', chapter: 2, difficulty: 'dificil', order_index: 40, source_type: 'texto_biblico',
    question: 'Segundo Jonas 2:8, os que se entregam à idolatria vã abandonam…',
    option_a: 'as suas riquezas', option_b: 'aquele que lhes é misericordioso', option_c: 'os seus amigos', option_d: 'a sua terra natal',
    correct_answer: 'B',
    explanation:
      'Jonas 2:8: "Os que se entregam à idolatria vã abandonam aquele que lhes é misericordioso." No fundo do mar, Jonas reconheceu: trocar Deus por ídolos é abandonar a própria misericórdia.',
    hint: 'Eles abandonam o próprio Deus misericordioso.',
  },
  {
    id: uuid('030000000306'), book_id: 'jonas', chapter: 3, difficulty: 'dificil', order_index: 41, source_type: 'texto_biblico',
    question: 'No decreto do rei, o que se esperava que Deus fizesse? "Quem sabe se Deus se ___?"',
    option_a: 'esconderá', option_b: 'voltará e se arrependerá', option_c: 'calarã para sempre', option_d: 'mostrará em sonhos',
    correct_answer: 'B',
    explanation:
      'Jonas 3:9: "Quem sabe se Deus se voltará, e se arrependerá, e se apartará do furor da sua ira, de sorte que não pereçamos?" O rei pagão entendeu o coração de Deus melhor que o profeta: Deus se agrada em perdoar quem se arrepende.',
    hint: 'O rei esperava que Deus mudasse de propósito.',
  },
  {
    id: uuid('030000000307'), book_id: 'jonas', chapter: 4, difficulty: 'dificil', order_index: 42, source_type: 'texto_biblico',
    question: 'Como Deus respondeu à ira de Jonas em 4:4?',
    option_a: '"Cala-te, profeta rebelde!"', option_b: '"É razoável essa tua ira?"', option_c: '"Volta para Israel agora!"', option_d: '"Não te escolhi mais!"',
    correct_answer: 'B',
    explanation:
      'Jonas 4:4: "Respondeu o Senhor: É razoável essa tua ira?" Em vez de repreender com dureza, Deus fez uma pergunta que expõe o absurdo: irar-se porque Deus perdoou é irracional.',
    hint: 'Deus respondeu com uma pergunta, não com uma repreensão.',
  },
  {
    id: uuid('030000000308'), book_id: 'jonas', chapter: 4, difficulty: 'dificil', order_index: 43, source_type: 'texto_biblico',
    question: 'Para que lado da cidade Jonas saiu após pregar?',
    option_a: 'Oeste', option_b: 'Norte', option_c: 'Oriente (leste)', option_d: 'Sul',
    correct_answer: 'C',
    explanation:
      'Jonas 4:5: Jonas "saiu da cidade e assentou-se ao oriente dela." Do alto, a leste, ele assistiria ao que aconteceria com Nínive — ainda esperando o fogo do juízo.',
    hint: 'É o lado onde o sol nasce.',
  },
  {
    id: uuid('030000000309'), book_id: 'jonas', chapter: 4, difficulty: 'dificil', order_index: 44, source_type: 'texto_biblico',
    question: 'O que Jonas construiu a leste de Nínive?',
    option_a: 'Um altar', option_b: 'Uma cabana (enramada)', option_c: 'Um muro', option_d: 'Uma torre de vigia',
    correct_answer: 'B',
    explanation:
      'Jonas 4:5: Jonas "fez ali uma cabana (enramada) e assentou-se debaixo dela, à sombra, até ver o que aconteceria à cidade." A cabana de folhas seria completada pela sombra da planta de Deus (4:6).',
    hint: 'Era um abrigo de folhas para fazer sombra.',
  },
  {
    id: uuid('030000000310'), book_id: 'jonas', chapter: 4, difficulty: 'dificil', order_index: 45, source_type: 'texto_biblico',
    question: 'O que Deus preparou para ferir a planta que dava sombra a Jonas?',
    option_a: 'Um verme', option_b: 'Uma tempestade', option_c: 'Uma nuvem de gafanhotos', option_d: 'Um raio',
    correct_answer: 'A',
    explanation:
      'Jonas 4:7: "Deus preparou um verme, ao subir da alva do dia seguinte, o qual feriu a planta, e esta se secou." O mesmo Deus que preparou o peixe (1:17) e a planta (4:6) preparou o verme e o vento (4:8): tudo O serve.',
    hint: 'Foi um bichinho pequeno, ao amanhecer.',
  },
  {
    id: uuid('030000000311'), book_id: 'jonas', chapter: 4, difficulty: 'dificil', order_index: 46, source_type: 'texto_biblico',
    question: 'Que vento Deus preparou contra Jonas, segundo 4:8?',
    option_a: 'Um vento do norte, frio', option_b: 'Um vento oriental calmoso (veemente)', option_c: 'Uma brisa suave do mar', option_d: 'Um redemoinho do deserto',
    correct_answer: 'B',
    explanation:
      'Jonas 4:8: "Deus preparou um vento calmoso, oriental." O vento quente do leste, somado ao sol sobre a cabeça, fez Jonas desmaiar e pedir a morte — preparando a pergunta final de Deus.',
    hint: 'Era um vento quente vindo do leste.',
  },
  {
    id: uuid('030000000312'), book_id: 'jonas', chapter: 4, difficulty: 'dificil', order_index: 47, source_type: 'texto_biblico',
    question: 'Complete o lamento de Jonas em 4:8: "Melhor me é ___ do que viver".',
    option_a: 'dormir', option_b: 'morrer', option_c: 'calar', option_d: 'fugir',
    correct_answer: 'B',
    explanation:
      'Jonas 4:8: "melhor me é morrer do que viver." Jonas repetiu o pedido de 4:3: preferia morrer a ver Nínive perdoada — e agora, sem a sombra da planta. A resposta de Deus veio em forma de lição (4:10-11).',
    hint: 'Ele repetiu o pedido que já fizera no versículo 3.',
  },
  {
    id: uuid('030000000313'), book_id: 'jonas', chapter: 4, difficulty: 'dificil', order_index: 48, source_type: 'texto_biblico',
    question: 'Segundo Jonas 4:11, os ninivitas não sabiam discernir entre…',
    option_a: 'o bem e o mal', option_b: 'a mão direita e a esquerda', option_c: 'o dia e a noite', option_d: 'a verdade e a mentira',
    correct_answer: 'B',
    explanation:
      'Jonas 4:11: "mais de cento e vinte mil pessoas, que não sabem discernir entre a mão direita e a esquerda." A expressão indica ignorância espiritual (como crianças pequenas): motivo para compaixão, não para ira.',
    hint: 'É algo que até uma criança pequena confunde.',
  },
  {
    id: uuid('030000000314'), book_id: 'jonas', chapter: 4, difficulty: 'dificil', order_index: 49, source_type: 'texto_biblico',
    question: 'Além das cento e vinte mil pessoas, de quem mais Deus disse ter compaixão em 4:11?',
    option_a: 'Dos reis vizinhos', option_b: 'De muitos animais', option_c: 'Dos exilados de Israel', option_d: 'Dos marinheiros do navio',
    correct_answer: 'B',
    explanation:
      'Jonas 4:11 termina: "e também muitos animais?" O livro se encerra com uma pergunta sem resposta registrada — e com Deus defendendo sua compaixão até pelos animais da cidade inimiga.',
    hint: 'O livro termina falando deles, com uma pergunta.',
  },
  {
    id: uuid('030000000315'), book_id: 'jonas', chapter: 4, difficulty: 'dificil', order_index: 50, source_type: 'texto_biblico',
    question: 'Complete Jonas 4:10: "Tiveste compaixão da planta, na qual não ___".',
    option_a: 'trabalhaste', option_b: 'confiaste', option_c: 'descansaste', option_d: 'meditaste',
    correct_answer: 'A',
    explanation:
      'Jonas 4:10: "Tiveste compaixão da planta, na qual não trabalhaste, nem a fizeste crescer; que numa noite nasceu e numa noite pereceu." O argumento é do menor para o maior: se Jonas amou a planta passageira, quanto mais Deus amaria Nínive.',
    hint: 'Jonas não fez nada para merecer a planta.',
  },
];

export default JONAS_QUESTIONS;
