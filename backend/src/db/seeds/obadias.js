/**
 * QUIZ BÍBLICO · Banco de perguntas — OBADIAS (50 questões)
 * 15 fáceis · 20 médias · 15 difíceis · Capítulo único (21 versículos)
 * Todas as perguntas, alternativas, explicações e dicas referem-se
 * exclusivamente ao livro de Obadias.
 */

const uuid = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`;

export const OBADIAS_QUESTIONS = [
  // ================================================================ FÁCEIS
  {
    id: uuid('020000000101'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 1, source_type: 'texto_biblico',
    question: 'Quantos capítulos tem o livro de Obadias?',
    option_a: 'Um', option_b: 'Três', option_c: 'Quatro', option_d: 'Doze',
    correct_answer: 'A',
    explanation:
      'Obadias possui um único capítulo, com 21 versículos. É o menor livro do Antigo Testamento e o quarto entre os Profetas Menores (depois de Amós e antes de Jonas).',
    hint: 'É o menor livro do Antigo Testamento.',
  },
  {
    id: uuid('020000000102'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 2, source_type: 'texto_biblico',
    question: 'Quantos versículos tem o livro de Obadias?',
    option_a: '12', option_b: '21', option_c: '31', option_d: '48',
    correct_answer: 'B',
    explanation:
      'O capítulo único de Obadias tem 21 versículos: os versículos 1 a 16 anunciam o juízo contra Edom e os versículos 17 a 21 prometem o livramento de Sião e o reino do Senhor.',
    hint: 'É o triplo de sete.',
  },
  {
    id: uuid('020000000103'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 3, source_type: 'texto_biblico',
    question: 'O que significa o nome "Obadias"?',
    option_a: 'Deus é forte', option_b: 'Servo do Senhor', option_c: 'A quem Deus ajuda', option_d: 'Paz do Senhor',
    correct_answer: 'B',
    explanation:
      'Obadias (em hebraico, Obadyah) significa "servo do Senhor" ou "adorador do Senhor". Nada mais se sabe sobre o profeta além do nome: toda a atenção do livro está na mensagem, não no mensageiro.',
    hint: 'Começa com "servo" — aquele que serve.',
  },
  {
    id: uuid('020000000104'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 4, source_type: 'texto_biblico',
    question: 'Contra qual nação é dirigida a profecia de Obadias?',
    option_a: 'Moabe', option_b: 'Amom', option_c: 'Edom', option_d: 'Filístia',
    correct_answer: 'C',
    explanation:
      'Obadias 1: "Assim diz o Senhor Deus a respeito de Edom." Todo o livro é uma sentença contra Edom, nação descendente de Esaú, por sua soberba e pela violência contra Judá.',
    hint: 'É a nação descendente de Esaú, irmão de Jacó.',
  },
  {
    id: uuid('020000000105'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 5, source_type: 'texto_biblico',
    question: 'De qual patriarca descendiam os edomitas?',
    option_a: 'Jacó', option_b: 'Isaque, por meio de Jacó', option_c: 'Esaú', option_d: 'Ismael',
    correct_answer: 'C',
    explanation:
      'Os edomitas descendiam de Esaú, também chamado Edom (Gênesis 25:30; 36:1). Por isso Obadias chama Edom de "monte de Esaú" (v. 8-9, 19, 21) e de "casa de Esaú" (v. 18).',
    hint: 'É o irmão gêmeo de Jacó, que vendeu a primogenitura.',
  },
  {
    id: uuid('020000000106'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 6, source_type: 'texto_biblico',
    question: 'Quem era o "irmão" contra quem Edom praticou violência, segundo Obadias 10?',
    option_a: 'Ismael', option_b: 'Jacó', option_c: 'Labão', option_d: 'Ló',
    correct_answer: 'B',
    explanation:
      'Obadias 10: "Por causa da violência feita a teu irmão Jacó, cobrir-te-á a vergonha." Edom e Israel eram povos irmãos — descendentes de Esaú e Jacó — e por isso o crime de Edom foi ainda mais grave.',
    hint: 'É o outro nome de Israel, pai das doze tribos.',
  },
  {
    id: uuid('020000000107'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 7, source_type: 'texto_biblico',
    question: 'Complete Obadias 4: "Ainda que te eleves como ___".',
    option_a: 'o cedro', option_b: 'a águia', option_c: 'a torre', option_d: 'o monte',
    correct_answer: 'B',
    explanation:
      'Obadias 4: "Se te elevares como águia e puseres o teu ninho entre as estrelas, dali te derribarei, diz o Senhor." Nem a altura das fortalezas de Edom nas montanhas o livraria do juízo.',
    hint: 'É a ave que voa mais alto e faz ninho nos penhascos.',
  },
  {
    id: uuid('020000000108'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 8, source_type: 'texto_biblico',
    question: 'Onde habitava Edom, segundo Obadias 3?',
    option_a: 'Em tendas no deserto', option_b: 'Nas fendas das rochas, em morada alta', option_c: 'Em ilhas no mar', option_d: 'Em cavernas junto ao Jordão',
    correct_answer: 'B',
    explanation:
      'Obadias 3: "ó tu que habitas nas fendas das rochas, cuja morada é alta." Edom ocupava a região montanhosa de Seir, com cidades fortificadas nas rochas (como Sela, a futura Petra), e confiava nessas defesas naturais.',
    hint: 'Era um lugar alto, entre pedras, que parecia inexpugnável.',
  },
  {
    id: uuid('020000000109'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 9, source_type: 'texto_biblico',
    question: 'Como termina o livro de Obadias (v. 21)?',
    option_a: '"e o reino será do Senhor"', option_b: '"e chorarão sobre Edom"', option_c: '"e haverá paz para sempre"', option_d: '"e se calarão as nações"',
    correct_answer: 'A',
    explanation:
      'Obadias 21: "Subirão salvadores ao monte Sião, para julgarem o monte de Esaú; e o reino será do Senhor." O livro que começa com guerra contra Edom termina com a vitória universal do Reino de Deus.',
    hint: 'É a frase que entrega o reino a Deus.',
  },
  {
    id: uuid('020000000110'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 10, source_type: 'texto_biblico',
    question: 'Segundo Obadias 3, o que enganou a Edom?',
    option_a: 'Os falsos profetas', option_b: 'A soberba do seu coração', option_c: 'O ouro de Ofir', option_d: 'Os exércitos da Assíria',
    correct_answer: 'B',
    explanation:
      'Obadias 3: "A soberba do teu coração te enganou." O pecado-raiz de Edom foi o orgulho: confiava nas montanhas, nos aliados, nos sábios e nos valentes — e dizia: "Quem me derribará?"',
    hint: 'É o pecado de quem se acha inalcançável.',
  },
  {
    id: uuid('020000000111'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 11, source_type: 'texto_biblico',
    question: 'O que Deus faria com Edom, ainda que pusesse seu ninho entre as estrelas?',
    option_a: 'O exaltaria ainda mais', option_b: 'O derribaria', option_c: 'O esconderia', option_d: 'O esqueceria',
    correct_answer: 'B',
    explanation:
      'Obadias 4: "dali te derribarei, diz o Senhor." Nenhuma altura — nem fortalezas nas rochas, nem orgulho que chega às estrelas — pode resistir ao juízo de Deus.',
    hint: 'É o oposto de exaltar: jogar por terra.',
  },
  {
    id: uuid('020000000112'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 12, source_type: 'texto_biblico',
    question: 'Por que Edom seria coberto de vergonha e exterminado, segundo Obadias 10?',
    option_a: 'Por adorar o bezerro de ouro', option_b: 'Por sua preguiça no trabalho', option_c: 'Pela violência feita ao irmão Jacó', option_d: 'Por recusar pagar impostos',
    correct_answer: 'C',
    explanation:
      'Obadias 10: "Por causa da violência feita a teu irmão Jacó, cobrir-te-á a vergonha, e serás exterminado para sempre." Quando Jerusalém caiu, Edom se alegrou, saqueou e entregou os fugitivos (v. 11-14).',
    hint: 'Foi um crime contra o povo irmão.',
  },
  {
    id: uuid('020000000113'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 13, source_type: 'texto_biblico',
    question: 'Segundo Obadias 15, o que está perto sobre todas as nações?',
    option_a: 'O Dia do Senhor', option_b: 'O ano do jubileu', option_c: 'A festa dos tabernáculos', option_d: 'O sábado da terra',
    correct_answer: 'A',
    explanation:
      'Obadias 15: "Porque o Dia do Senhor está perto, sobre todas as nações." O juízo sobre Edom é apresentado como parte do grande Dia em que Deus julgará todos os povos — tema central dos profetas.',
    hint: 'É o grande dia do juízo de Deus sobre as nações.',
  },
  {
    id: uuid('020000000114'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 14, source_type: 'texto_biblico',
    question: 'Complete Obadias 15: "Como tu fizeste, assim se fará ___".',
    option_a: 'ao teu vizinho', option_b: 'contigo', option_c: 'aos teus filhos', option_d: 'naquele dia',
    correct_answer: 'B',
    explanation:
      'Obadias 15: "como tu fizeste, assim se fará contigo; o teu feito tornará sobre a tua cabeça." É a lei da retribuição: Edom seria tratado exatamente como tratou Judá.',
    hint: 'A medida usada contra os outros voltaria contra ele mesmo.',
  },
  {
    id: uuid('020000000115'), book_id: 'obadias', chapter: 1, difficulty: 'facil', order_index: 15, source_type: 'texto_biblico',
    question: 'Sobre qual cidade estrangeiros lançaram sortes, segundo Obadias 11?',
    option_a: 'Samaria', option_b: 'Damasco', option_c: 'Jerusalém', option_d: 'Tiro',
    correct_answer: 'C',
    explanation:
      'Obadias 11: estrangeiros "lançaram sortes sobre Jerusalém, tu mesmo eras um deles." O versículo descreve a queda de Jerusalém, quando Edom se uniu aos invasores em vez de ajudar o povo irmão.',
    hint: 'É a capital de Judá, onde ficava o templo.',
  },

  // ================================================================ MÉDIAS
  {
    id: uuid('020000000201'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 16, source_type: 'texto_biblico',
    question: 'Como o livro de Obadias se apresenta logo no primeiro versículo?',
    option_a: 'Lamentação de Obadias', option_b: 'Visão de Obadias', option_c: 'Cântico de Obadias', option_d: 'Carta de Obadias',
    correct_answer: 'B',
    explanation:
      'Obadias 1: "Visão de Obadias: Assim diz o Senhor Deus a respeito de Edom." O livro é uma visão profética — Deus mostrou ao profeta a sentença contra Edom.',
    hint: 'É algo que Deus mostrou ao profeta, não algo que ele escreveu por si.',
  },
  {
    id: uuid('020000000202'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 17, source_type: 'texto_biblico',
    question: 'Complete Obadias 1: "Assim diz o ___ a respeito de Edom".',
    option_a: 'rei de Judá', option_b: 'Senhor Deus', option_c: 'anjo do Senhor', option_d: 'profeta aos povos',
    correct_answer: 'B',
    explanation:
      'Obadias 1: "Assim diz o Senhor Deus a respeito de Edom." A fórmula mostra que a sentença contra Edom vem do próprio Deus, não de opinião humana.',
    hint: 'É a fórmula clássica dos profetas: "Assim diz o…".',
  },
  {
    id: uuid('020000000203'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 18, source_type: 'texto_biblico',
    question: 'Qual mensagem o mensageiro levou às nações, segundo Obadias 1?',
    option_a: 'Trazei ofertas a Sião', option_b: 'Levantai-vos contra ela para a guerra', option_c: 'Fugi para os montes', option_d: 'Guardai o sábado',
    correct_answer: 'B',
    explanation:
      'Obadias 1: "às nações foi enviado mensageiro, dizendo: Levantai-vos, e levantemo-nos contra ela para a guerra." Deus convoca as próprias nações para executar o juízo contra Edom.',
    hint: 'Era uma convocação para lutar contra Edom.',
  },
  {
    id: uuid('020000000204'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 19, source_type: 'texto_biblico',
    question: 'Complete Obadias 2: "Eis que te fiz ___ entre as nações".',
    option_a: 'grande', option_b: 'pequeno', option_c: 'rico', option_d: 'temido',
    correct_answer: 'B',
    explanation:
      'Obadias 2: "Eis que te fiz pequeno entre as nações; tu és mui desprezado." O orgulhoso Edom, que se julgava grande nas montanhas, seria reduzido e desprezado entre os povos.',
    hint: 'É o oposto do que Edom pensava de si mesmo.',
  },
  {
    id: uuid('020000000205'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 20, source_type: 'texto_biblico',
    question: 'Segundo Obadias 5, os vindimadores (colhedores de uva) deixariam o quê?',
    option_a: 'Alguns cachos', option_b: 'As folhas', option_c: 'Nada, levariam tudo', option_d: 'Apenas as uvas verdes',
    correct_answer: 'A',
    explanation:
      'Obadias 5: "Se a ti viessem os vindimadores, não deixariam alguns cachos?" Até ladrões e colhedores deixam restos — mas o saque de Edom seria total, sem sobra alguma (v. 6).',
    hint: 'Até os ladrões mais gananciosos deixam alguma sobra.',
  },
  {
    id: uuid('020000000206'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 21, source_type: 'texto_biblico',
    question: 'Complete Obadias 6: "Como foram esquadrinhados os de ___!"',
    option_a: 'Jacó', option_b: 'Esaú', option_c: 'Ismael', option_d: 'Ló',
    correct_answer: 'B',
    explanation:
      'Obadias 6: "Como foram esquadrinhados os de Esaú! Como foram explorados os seus tesouros escondidos!" Ser esquadrinhado é ser revistado por completo: nada de Edom escaparia do saque.',
    hint: 'É o outro nome do pai dos edomitas.',
  },
  {
    id: uuid('020000000207'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 22, source_type: 'texto_biblico',
    question: 'Segundo Obadias 6, o que seria explorado (descoberto) em Edom?',
    option_a: 'As minas de cobre', option_b: 'Os tesouros escondidos', option_c: 'As rotas de caravanas', option_d: 'Os poços de água',
    correct_answer: 'B',
    explanation:
      'Obadias 6: "Como foram explorados os seus tesouros escondidos!" Edom controlava rotas comerciais e acumulara riquezas; tudo seria descoberto e saqueado.',
    hint: 'Eram riquezas que Edom julgava bem guardadas.',
  },
  {
    id: uuid('020000000208'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 23, source_type: 'texto_biblico',
    question: 'Segundo Obadias 7, até onde os aliados levariam Edom?',
    option_a: 'Até o mar', option_b: 'Até as fronteiras', option_c: 'Até o deserto', option_d: 'Até o rio',
    correct_answer: 'B',
    explanation:
      'Obadias 7: "Todos os teus aliados te levaram para as fronteiras." Os supostos amigos expulsariam Edom do seu próprio território: a primeira traição de uma sequência — engano, armadilha e falta de entendimento.',
    hint: 'Seria expulso até o limite do próprio território.',
  },
  {
    id: uuid('020000000209'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 24, source_type: 'texto_biblico',
    question: 'Complete Obadias 7: "Os que comem o teu pão puseram ___ debaixo de ti".',
    option_a: 'um banquete', option_b: 'uma armadilha', option_c: 'um tapete', option_d: 'um trono',
    correct_answer: 'B',
    explanation:
      'Obadias 7: "os que comem o teu pão puseram armadilha debaixo de ti." Comer o pão de alguém era sinal de aliança; os aliados de Edom quebrariam a aliança e o trairiam.',
    hint: 'Quem comia à mesa com ele preparava uma traição.',
  },
  {
    id: uuid('020000000210'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 25, source_type: 'texto_biblico',
    question: 'Segundo Obadias 8, quem pereceria em Edom naquele dia?',
    option_a: 'Os pastores', option_b: 'Os sábios', option_c: 'Os lavradores', option_d: 'Os estrangeiros',
    correct_answer: 'B',
    explanation:
      'Obadias 8: "Não farei perecer os sábios de Edom e o entendimento do monte de Esaú?" Edom era famosa pela sabedoria (Temã; Elifaz, amigo de Jó, era temanita) — e até isso Deus tiraria.',
    hint: 'Edom se orgulhava deles; Temã era famosa por isso.',
  },
  {
    id: uuid('020000000211'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 26, source_type: 'texto_biblico',
    question: 'Segundo Obadias 9, os valentes de qual lugar estariam atemorizados?',
    option_a: 'Temã', option_b: 'Bozra', option_c: 'Sela', option_d: 'Seir',
    correct_answer: 'A',
    explanation:
      'Obadias 9: "Também os teus valentes, ó Temã, estarão atemorizados." Temã era uma cidade/distrito de Edom, famosa pelos sábios e guerreiros. Até os valentes tremeriam no dia do juízo.',
    hint: 'É a terra de Elifaz, o amigo de Jó.',
  },
  {
    id: uuid('020000000212'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 27, source_type: 'texto_biblico',
    question: 'O que os estrangeiros lançaram sobre Jerusalém, segundo Obadias 11?',
    option_a: 'Flechas', option_b: 'Sortes', option_c: 'Redes', option_d: 'Tochas',
    correct_answer: 'B',
    explanation:
      'Obadias 11: estrangeiros "lançaram sortes sobre Jerusalém." Lançar sortes era sortear o despojo da cidade conquistada — e Edom participou da partilha como um dos invasores.',
    hint: 'Era o sorteio para dividir os despojos da cidade.',
  },
  {
    id: uuid('020000000213'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 28, source_type: 'texto_biblico',
    question: 'Complete Obadias 11: diante da queda de Jerusalém, "tu mesmo eras ___ deles".',
    option_a: 'o juiz', option_b: 'um', option_c: 'o inimigo', option_d: 'o refúgio',
    correct_answer: 'B',
    explanation:
      'Obadias 11: "tu mesmo eras um deles." Edom não ficou neutra: agiu como um dos invasores de Jerusalém. A neutralidade diante do mal do irmão já seria culpa; a participação ativa foi crime.',
    hint: 'Edom se fez igual aos invasores.',
  },
  {
    id: uuid('020000000214'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 29, source_type: 'texto_biblico',
    question: 'Segundo Obadias 12, o que Edom não devia ter "alargado" no dia da angústia?',
    option_a: 'Os celeiros', option_b: 'A boca', option_c: 'As fronteiras', option_d: 'Os exércitos',
    correct_answer: 'B',
    explanation:
      'Obadias 12: "nem ter alargado a boca, no dia da angústia." Alargar a boca é zombar, escarnecer. Edom não apenas assistiu: alegrou-se e zombou da ruína de Judá.',
    hint: 'É o gesto de quem zomba e escarnece.',
  },
  {
    id: uuid('020000000215'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 30, source_type: 'texto_biblico',
    question: 'Segundo Obadias 13, Edom não devia ter entrado pela ___ do povo de Deus.',
    option_a: 'porta', option_b: 'muralha', option_c: 'praça', option_d: 'fonte',
    correct_answer: 'A',
    explanation:
      'Obadias 13: "Não devias ter entrado pela porta do meu povo, no dia da sua calamidade." Edom invadiu as cidades de Judá no dia da calamidade para saquear, em vez de socorrer.',
    hint: 'É a entrada da cidade, por onde os invasores passaram.',
  },
  {
    id: uuid('020000000216'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 31, source_type: 'texto_biblico',
    question: 'Segundo Obadias 13, Edom lançou mão dos ___ de Judá.',
    option_a: 'filhos', option_b: 'bens', option_c: 'altares', option_d: 'documentos',
    correct_answer: 'B',
    explanation:
      'Obadias 13: "nem ter lançado mão dos seus bens, no dia da sua calamidade." Aproveitando-se da desgraça do irmão, Edom saqueou os bens de Judá.',
    hint: 'Foram as riquezas e posses que ele saqueou.',
  },
  {
    id: uuid('020000000217'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 32, source_type: 'texto_biblico',
    question: 'Onde Edom se posicionou para exterminar os que escapavam, segundo Obadias 14?',
    option_a: 'Nos portos', option_b: 'Nas encruzilhadas', option_c: 'Nos montes', option_d: 'Nos vales',
    correct_answer: 'B',
    explanation:
      'Obadias 14: "Nem ter parado nas encruzilhadas, para exterminares os que escapassem; nem ter entregado os que lhe restassem." Edom fechou as rotas de fuga e entregou os sobreviventes — o auge da crueldade.',
    hint: 'É o cruzamento de caminhos, onde se intercepta quem foge.',
  },
  {
    id: uuid('020000000218'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 33, source_type: 'texto_biblico',
    question: 'Segundo Obadias 16, o que todas as nações beberiam de contínuo?',
    option_a: 'O vinho da alegria', option_b: 'O cálice do juízo de Deus', option_c: 'A água da vida', option_d: 'O leite da terra',
    correct_answer: 'B',
    explanation:
      'Obadias 16: "como bebestes no meu santo monte, assim beberão, de contínuo, todas as nações." Beber o cálice é imagem do juízo divino (como em Jeremias 25 e Apocalipse 14): todas as nações ímpias provariam a ira de Deus.',
    hint: 'É a bebida amarga da ira de Deus contra as nações.',
  },
  {
    id: uuid('020000000219'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 34, source_type: 'texto_biblico',
    question: 'Segundo Obadias 17, onde haveria livramento?',
    option_a: 'No monte das Oliveiras', option_b: 'No monte Sião', option_c: 'No monte Sinai', option_d: 'No monte Carmelo',
    correct_answer: 'B',
    explanation:
      'Obadias 17: "Mas, no monte Sião, haverá livramento; o monte será santo." Enquanto Edom seria exterminado, Sião (Jerusalém, o povo de Deus) seria preservada e santificada.',
    hint: 'É o monte de Jerusalém, onde ficava o templo.',
  },
  {
    id: uuid('020000000220'), book_id: 'obadias', chapter: 1, difficulty: 'medio', order_index: 35, source_type: 'texto_biblico',
    question: 'Em Obadias 18, a casa de Jacó será fogo e a casa de Esaú será…',
    option_a: 'água', option_b: 'palha', option_c: 'pedra', option_d: 'ferro',
    correct_answer: 'B',
    explanation:
      'Obadias 18: "A casa de Jacó será fogo... e a casa de Esaú, palha." O povo de Deus, instrumento do juízo, consumiria Edom como o fogo consome a palha — e "ninguém mais restará da casa de Esaú".',
    hint: 'É o que o fogo consome mais rápido.',
  },

  // =============================================================== DIFÍCEIS
  {
    id: uuid('020000000301'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 36, source_type: 'texto_biblico',
    question: 'Em Obadias 18, a casa de José será…',
    option_a: 'chama', option_b: 'vento', option_c: 'martelo', option_d: 'espada',
    correct_answer: 'A',
    explanation:
      'Obadias 18: "A casa de Jacó será fogo, e a casa de José, chama, e a casa de Esaú, palha." Jacó (Judá) e José (as tribos do Norte, Efraim/Manassés) aparecem reunidos como instrumento único do juízo — promessa de reunificação de Israel.',
    hint: 'Completa o trio: fogo, ___, palha.',
  },
  {
    id: uuid('020000000302'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 37, source_type: 'texto_biblico',
    question: 'Segundo Obadias 19, quem possuiria o monte de Esaú?',
    option_a: 'Os do Neguebe (Sul)', option_b: 'Os de Tiro', option_c: 'Os de Damasco', option_d: 'Os do Egito',
    correct_answer: 'A',
    explanation:
      'Obadias 19: "Os do Neguebe possuirão o monte de Esaú." O Neguebe é a região sul de Judá, vizinha de Edom: os vizinhos do sul herdariam o território do orgulhoso vizinho exterminado.',
    hint: 'É a região do sul de Judá, vizinha de Edom.',
  },
  {
    id: uuid('020000000303'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 38, source_type: 'texto_biblico',
    question: 'Segundo Obadias 19, os da planície (Sefelá) possuiriam…',
    option_a: 'os moabitas', option_b: 'os filisteus', option_c: 'os amonitas', option_d: 'os sírios',
    correct_answer: 'B',
    explanation:
      'Obadias 19: "os da planície, os filisteus." A Sefelá é a planície baixa entre a montanha de Judá e a costa filisteia. O povo de Deus retomaria até as terras dos antigos opressores.',
    hint: 'É o povo da costa, inimigo de Israel desde Sansão e Davi.',
  },
  {
    id: uuid('020000000304'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 39, source_type: 'texto_biblico',
    question: 'Segundo Obadias 19, Benjamim possuiria…',
    option_a: 'a Galileia', option_b: 'a Gileade', option_c: 'o Neguebe', option_d: 'a Sefelá',
    correct_answer: 'B',
    explanation:
      'Obadias 19: "Benjamim possuirá a Gileade." A restauração ampliaria as fronteiras: a pequena tribo de Benjamim herdaria a fértil Gileade, do outro lado do Jordão.',
    hint: 'É a terra além do Jordão, famosa pelo bálsamo.',
  },
  {
    id: uuid('020000000305'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 40, source_type: 'texto_biblico',
    question: 'Segundo Obadias 20, os exilados de Israel possuiriam terras até…',
    option_a: 'Sarepta', option_b: 'Nínive', option_c: 'Babilônia', option_d: 'Menfis',
    correct_answer: 'A',
    explanation:
      'Obadias 20: "Os exilados deste exército dos filhos de Israel possuirão os cananeus até Sarepta." Sarepta era cidade fenícia da costa (onde Elias foi sustentado pela viúva, 1 Reis 17): Israel se expandiria até o litoral norte.',
    hint: 'É a cidade fenícia onde Elias multiplicou a farinha da viúva.',
  },
  {
    id: uuid('020000000306'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 41, source_type: 'texto_biblico',
    question: 'Segundo Obadias 20, os cativos de Jerusalém estavam em…',
    option_a: 'Sefarade', option_b: 'Tarsis', option_c: 'Patros', option_d: 'Elão',
    correct_answer: 'A',
    explanation:
      'Obadias 20: "os cativos de Jerusalém, que estão em Sefarade, possuirão as cidades do Sul." Sefarade era uma terra distante de exílio (a tradição judaica a identificou com a Espanha, dando nome aos judeus sefarditas).',
    hint: 'É o lugar que deu nome aos judeus sefarditas.',
  },
  {
    id: uuid('020000000307'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 42, source_type: 'texto_biblico',
    question: 'Segundo Obadias 21, quem subiria ao monte Sião?',
    option_a: 'Guerreiros', option_b: 'Salvadores', option_c: 'Sacerdotes', option_d: 'Anjos',
    correct_answer: 'B',
    explanation:
      'Obadias 21: "Subirão salvadores ao monte Sião, para julgarem o monte de Esaú." Deus levantaria libertadores — como os juízes do passado — para executar a sentença sobre Edom.',
    hint: 'São libertadores, como os juízes que Deus levantava.',
  },
  {
    id: uuid('020000000308'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 43, source_type: 'texto_biblico',
    question: 'Para que os salvadores subiriam ao monte Sião, segundo Obadias 21?',
    option_a: 'Para oferecer sacrifícios', option_b: 'Para julgarem o monte de Esaú', option_c: 'Para coroar um rei', option_d: 'Para edificar muralhas',
    correct_answer: 'B',
    explanation:
      'Obadias 21: os salvadores subiriam "para julgarem o monte de Esaú." O monte de Esaú (Edom) seria julgado a partir do monte Sião (o povo de Deus): a justiça final pertence ao Senhor.',
    hint: 'Eles executariam a sentença contra Edom.',
  },
  {
    id: uuid('020000000309'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 44, source_type: 'texto_biblico',
    question: 'Complete Obadias 16: as nações "beberão, e engolirão, e serão como se nunca tivessem ___".',
    option_a: 'pecado', option_b: 'sido', option_c: 'nascido', option_d: 'voltado',
    correct_answer: 'B',
    explanation:
      'Obadias 16: "beberão, e engolirão, e serão como se nunca tivessem sido." O juízo apagaria as nações ímpias da história — enquanto o povo de Deus herdaria a terra (v. 17).',
    hint: 'Seriam apagadas da existência.',
  },
  {
    id: uuid('020000000310'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 45, source_type: 'texto_biblico',
    question: 'Complete Obadias 18: "ninguém mais restará da casa de ___".',
    option_a: 'Jacó', option_b: 'José', option_c: 'Esaú', option_d: 'Judá',
    correct_answer: 'C',
    explanation:
      'Obadias 18: "ninguém mais restará da casa de Esaú, porque o Senhor o disse." A sentença é total e irreversível — selada pela autoridade de quem fala: o próprio Senhor.',
    hint: 'É a casa que seria consumida como palha.',
  },
  {
    id: uuid('020000000311'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 46, source_type: 'texto_biblico',
    question: 'De onde Deus tiraria o entendimento, segundo Obadias 8?',
    option_a: 'Do palácio de Judá', option_b: 'Do monte de Esaú', option_c: 'Das escolas do Egito', option_d: 'Das praças de Tiro',
    correct_answer: 'B',
    explanation:
      'Obadias 8: "Não farei perecer os sábios de Edom e o entendimento do monte de Esaú?" O "monte de Esaú" é Edom, a nação montanhosa: até sua famosa sabedoria seria aniquilada.',
    hint: 'É outro nome para a própria terra de Edom.',
  },
  {
    id: uuid('020000000312'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 47, source_type: 'texto_biblico',
    question: 'Como termina Obadias 7? "…não há nele ___".',
    option_a: 'misericórdia', option_b: 'entendimento', option_c: 'força', option_d: 'temor',
    correct_answer: 'B',
    explanation:
      'Obadias 7 termina: "não há nele entendimento." Edom, famosa pelos sábios, não perceberia nem a traição dos próprios aliados — o juízo começaria pela cegueira.',
    hint: 'Faltaria a ele justamente aquilo de que se orgulhava: a sabedoria.',
  },
  {
    id: uuid('020000000313'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 48, source_type: 'texto_biblico',
    question: 'Segundo Obadias 9, de onde cada um seria exterminado "pela matança"?',
    option_a: 'Do vale do Jordão', option_b: 'Do monte de Esaú', option_c: 'Das cidades da costa', option_d: 'Do deserto do Neguebe',
    correct_answer: 'B',
    explanation:
      'Obadias 9: os valentes de Temã tremeriam, "para que do monte de Esaú seja cada um exterminado pela matança." Ninguém escaparia: o extermínio seria completo.',
    hint: 'É o mesmo "monte" citado nos versículos 8, 19 e 21.',
  },
  {
    id: uuid('020000000314'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 49, source_type: 'texto_biblico',
    question: 'Segundo Obadias 19, além dos campos de Efraim, quais outros campos seriam possuídos?',
    option_a: 'Os campos de Samaria', option_b: 'Os campos de Belém', option_c: 'Os campos de Jericó', option_d: 'Os campos de Dã',
    correct_answer: 'A',
    explanation:
      'Obadias 19: "possuirão também os campos de Efraim e os campos de Samaria." Efraim e Samaria representam o antigo reino do Norte: a restauração reuniria as terras de todo o Israel.',
    hint: 'É a capital do antigo reino do Norte.',
  },
  {
    id: uuid('020000000315'), book_id: 'obadias', chapter: 1, difficulty: 'dificil', order_index: 50, source_type: 'texto_biblico',
    question: 'Segundo Obadias 20, os cativos de Jerusalém possuiriam as cidades de qual região?',
    option_a: 'Do Norte', option_b: 'Do Sul (Neguebe)', option_c: 'Da costa', option_d: 'Da Transjordânia',
    correct_answer: 'B',
    explanation:
      'Obadias 20: "os cativos de Jerusalém, que estão em Sefarade, possuirão as cidades do Sul." Os exilados voltariam para herdar as cidades do Neguebe — possivelmente as mesmas terras antes ocupadas por Edom.',
    hint: 'É a mesma região citada no versículo 19: o Neguebe.',
  },
];

export default OBADIAS_QUESTIONS;
