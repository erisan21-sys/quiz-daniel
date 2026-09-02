/**
 * Sementes usadas pelo driver `local` (DB_DRIVER=local).
 * Conteúdo idêntico ao de database/seed.sql — as perguntas oficiais do quiz.
 * O `id` é determinístico para facilitar testes e migrações locais.
 */

const uuid = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`;

export const QUESTIONS = [
  // ---------------------------------------------------------------- FÁCEIS
  {
    id: uuid(101), chapter: 1, difficulty: 'facil', order_index: 1, source_type: 'texto_biblico',
    question: 'Em qual cidade Daniel vivia quando foi levado cativo para a Babilônia?',
    option_a: 'Nínive', option_b: 'Susa', option_c: 'Babilônia', option_d: 'Jerusalém',
    correct_answer: 'D',
    explanation:
      'Daniel 1:1-6 registra que no terceiro ano do reinado de Jeoaquim, rei de Judá, Nabucodonosor cercou Jerusalém e levou para a Babilônia jovens israelitas sem defeito físico, entre eles Daniel, Hananias, Misael e Azarias. Jerusalém era a capital de Judá.',
    hint: 'Era a capital do reino de Judá, onde ficava o templo.',
  },
  {
    id: uuid(102), chapter: 1, difficulty: 'facil', order_index: 2, source_type: 'texto_biblico',
    question: 'Qual nome babilônico foi dado a Daniel?',
    option_a: 'Beltessazar', option_b: 'Sadrac', option_c: 'Mesaque', option_d: 'Abede-Nego',
    correct_answer: 'A',
    explanation:
      'Daniel 1:7: "O chefe dos eunucos lhes pôs outros nomes: a Daniel, Beltessazar; a Hananias, Sadrac; a Misael, Mesaque; e a Azarias, Abede-Nego." Sadrac, Mesaque e Abede-Nego foram os nomes dados aos três amigos.',
    hint: 'Começa com "Bel", um elemento comum em nomes babilônicos ligados ao deus Bel.',
  },
  {
    id: uuid(103), chapter: 3, difficulty: 'facil', order_index: 3, source_type: 'texto_biblico',
    question: 'O que aconteceu com os três amigos de Daniel (Sadrac, Mesaque e Abede-Nego) na fornalha?',
    option_a: 'Foram consumidos pelo fogo imediatamente',
    option_b: 'Nebuzaradã os libertou antes do fogo',
    option_c: 'Saíram ilesos, e o rei viu um quarto homem semelhante a um filho dos deuses',
    option_d: 'O fogo se apagou quando Daniel orou',
    correct_answer: 'C',
    explanation:
      'Daniel 3:24-27: Nabucodonosor viu quatro homens soltos andando no meio do fogo, sem nenhum dano, e o aspecto do quarto era "semelhante a um filho dos deuses". Eles saíram sem que o fogo tivesse tocado seus corpos, e nem o cheiro de fogo passou sobre eles.',
    hint: 'O rei contou quatro pessoas, não três.',
  },
  {
    id: uuid(104), chapter: 5, difficulty: 'facil', order_index: 4, source_type: 'texto_biblico',
    question: 'O que foi escrito na parede durante o banquete do rei Belsazar?',
    option_a: 'MENE, MENE, TEQUEL e PARSIM',
    option_b: 'SANTO, SANTO, SANTO',
    option_c: 'GLÓRIA A DEUS NAS ALTURAS',
    option_d: 'EU SOU O QUE SOU',
    correct_answer: 'A',
    explanation:
      'Daniel 5:5, 25-28: apareceram dedos de mão humana escrevendo no reboco da parede: "MENE, MENE, TEQUEL, PARSIM". Daniel interpretou: MENE = Deus contou os dias do teu reino e deu fim a ele; TEQUEL = foste pesado na balança e achado em falta; PARSIM = o teu reino foi dividido e entregue aos medos e persas.',
    hint: 'São quatro palavras em aramaico, repetindo a primeira.',
  },
  {
    id: uuid(105), chapter: 6, difficulty: 'facil', order_index: 5, source_type: 'texto_biblico',
    question: 'Por que Daniel foi lançado na cova dos leões?',
    option_a: 'Porque recusou a comida do rei',
    option_b: 'Porque continuou orando a Deus três vezes ao dia, apesar do decreto real',
    option_c: 'Porque interpretou mal um sonho',
    option_d: 'Porque fugiu da Babilônia',
    correct_answer: 'B',
    explanation:
      'Daniel 6:10-16: um decreto assinado por Dario proibia, por trinta dias, qualquer petição a outro deus ou homem. Daniel, sabendo do decreto, entrou em casa e orou três vezes por dia, como era seu costume. Os acusadores o flagraram e o rei foi obrigado a lançá-lo na cova.',
    hint: 'A proibição durava trinta dias e valia para pedidos e orações.',
  },
  {
    id: uuid(106), chapter: 12, difficulty: 'facil', order_index: 6, source_type: 'texto_biblico',
    question: 'Quantos capítulos tem o livro de Daniel?',
    option_a: '10', option_b: '11', option_c: '12', option_d: '14',
    correct_answer: 'C',
    explanation:
      'O livro de Daniel possui 12 capítulos: os capítulos 1 a 6 trazem narrativas históricas (Babilônia e Média-Pérsia) e os capítulos 7 a 12 trazem as visões apocalípticas. Nota histórica: as versões gregas (Septuaginta/Vulgata) acrescentam os capítulos 13 e 14 (Susana e Bel e o Dragão), que não fazem parte do cânon hebraico/protestante.',
    hint: 'O último capítulo fala dos 1.290 e 1.335 dias.',
  },

  // ---------------------------------------------------------------- MÉDIAS
  {
    id: uuid(201), chapter: 1, difficulty: 'medio', order_index: 7, source_type: 'texto_biblico',
    question: 'Qual foi a decisão de Daniel em relação às finas iguarias e ao vinho do rei?',
    option_a: 'Aceitou tudo para não chamar atenção',
    option_b: 'Pediu para ser dispensado do serviço do rei',
    option_c: 'Propôs uma experiência de dez dias com legumes e água',
    option_d: 'Ofereceu a comida aos outros jovens',
    correct_answer: 'C',
    explanation:
      'Daniel 1:12: "Experimenta, peço-te, os teus servos dez dias; e que se nos deem legumes a comer e água a beber." Ao fim dos dez dias, a aparência deles era melhor e mais robusta do que a de todos os jovens que comiam das iguarias do rei.',
    hint: 'Foi um teste com prazo definido: dez dias.',
  },
  {
    id: uuid(202), chapter: 2, difficulty: 'medio', order_index: 8, source_type: 'texto_biblico',
    question: 'No sonho de Nabucodonosor, qual material formava a cabeça da grande estátua?',
    option_a: 'Prata', option_b: 'Bronze', option_c: 'Ferro', option_d: 'Ouro',
    correct_answer: 'D',
    explanation:
      'Daniel 2:32-33: a cabeça era de ouro fino; o peito e os braços, de prata; o ventre e os coxas, de bronze; as pernas, de ferro; os pés, em parte de ferro e em parte de barro. Daniel identifica explicitamente a cabeça de ouro com o próprio Nabucodonosor (v. 38).',
    hint: 'É o metal mais nobre e representa o próprio Nabucodonosor.',
  },
  {
    id: uuid(203), chapter: 3, difficulty: 'medio', order_index: 9, source_type: 'texto_biblico',
    question: 'Quais eram os nomes hebraicos dos três amigos de Daniel?',
    option_a: 'Hananias, Misael e Azarias',
    option_b: 'Ezequiel, Jeremias e Isaías',
    option_c: 'Sadrac, Mesaque e Abede-Nego',
    option_d: 'Elias, Eliseu e Natã',
    correct_answer: 'A',
    explanation:
      'Daniel 1:6-7: os jovens de Judá eram Daniel, Hananias, Misael e Azarias. Sadrac, Mesaque e Abede-Nego são os nomes babilônicos que receberam do chefe dos eunucos.',
    hint: 'Sadrac, Mesaque e Abede-Nego são os nomes babilônicos; a pergunta pede os hebraicos.',
  },
  {
    id: uuid(204), chapter: 3, difficulty: 'medio', order_index: 10, source_type: 'texto_biblico',
    question: 'Qual era a altura da estátua de ouro que Nabucodonosor levantou no campo de Dura?',
    option_a: 'Trinta côvados', option_b: 'Sessenta côvados', option_c: 'Noventa côvados', option_d: 'Cento e vinte côvados',
    correct_answer: 'B',
    explanation:
      'Daniel 3:1: "O rei Nabucodonosor fez uma estátua de ouro, cuja altura era de sessenta côvados, e a sua largura, de seis côvados; levantou-a no campo de Dura, na província de Babilônia." Sessenta côvados equivalem a aproximadamente 27 metros.',
    hint: 'É um número redondo, seis vezes dez.',
  },
  {
    id: uuid(205), chapter: 3, difficulty: 'medio', order_index: 11, source_type: 'texto_biblico',
    question: 'Qual foi a resposta dos três jovens ao serem ameaçados de morte na fornalha?',
    option_a: 'Pediram que Daniel intercedesse por eles',
    option_b: 'Disseram que o seu Deus podia livrá-los e que, mesmo que não livrasse, não serviriam aos deuses do rei',
    option_c: 'Concordaram em se curvar apenas uma vez',
    option_d: 'Fugiram para o deserto',
    correct_answer: 'B',
    explanation:
      'Daniel 3:17-18: "Se o nosso Deus, a quem servimos, quer livrar-nos, ele nos livrará da fornalha de fogo ardente e da tua mão, ó rei. Se não, fica sabendo, ó rei, que não serviremos a teus deuses, nem adoraremos a estátua de ouro que levantaste."',
    hint: 'A resposta termina com um "se não" — a fidelidade não dependia do livramento.',
  },
  {
    id: uuid(206), chapter: 4, difficulty: 'medio', order_index: 12, source_type: 'texto_biblico',
    question: 'O sonho da grande árvore que foi cortada, no capítulo 4, referia-se a quem?',
    option_a: 'Ao próprio Nabucodonosor', option_b: 'A Belsazar', option_c: 'A Dario, o medo', option_d: 'A Ciro, rei da Pérsia',
    correct_answer: 'A',
    explanation:
      'Daniel 4:20-26: a árvore alta e forte que alcançava o céu e foi mandada cortar, deixando apenas o toco com laços de ferro e bronze, representa Nabucodonosor. Ele seria expulso do meio dos homens e viveria com os animais do campo por "sete tempos", até reconhecer que o Altíssimo tem domínio sobre o reino dos homens.',
    hint: 'O próprio rei teve o sonho — e era sobre ele mesmo.',
  },
  {
    id: uuid(207), chapter: 5, difficulty: 'medio', order_index: 13, source_type: 'texto_biblico',
    question: 'Qual rei reinava em Babilônia quando a escrita apareceu na parede?',
    option_a: 'Nabucodonosor', option_b: 'Belsazar', option_c: 'Dario', option_d: 'Ciro',
    correct_answer: 'B',
    explanation:
      'Daniel 5:1-5: Belsazar deu um grande banquete a mil dos seus grandes. No meio da festa, mandou trazer os utensílios de ouro e prata que Nabucodonosor tirara do templo de Jerusalém, e foi então que apareceram os dedos de uma mão escrevendo na parede. Naquela mesma noite Belsazar foi morto e Dario, o medo, recebeu o reino (5:30-31).',
    hint: 'Ele era filho/descendente de Nabucodonosor e morreu naquela mesma noite.',
  },
  {
    id: uuid(208), chapter: 7, difficulty: 'medio', order_index: 14, source_type: 'texto_biblico',
    question: 'Na visão de Daniel 7, o segundo animal, semelhante a um urso, tinha o quê na boca?',
    option_a: 'Uma espada de bronze', option_b: 'Um cetro de ferro', option_c: 'Três costelas', option_d: 'Sete coroas',
    correct_answer: 'C',
    explanation:
      'Daniel 7:5: "Continuei olhando, e eis aqui o segundo animal, semelhante a um urso, o qual se levantou de um lado, tendo na boca três costelas entre os dentes; e lhe foi dito: Levanta-te, devora muita carne."',
    hint: 'É um número pequeno, entre três e quatro.',
  },

  // -------------------------------------------------------------- DIFÍCEIS
  {
    id: uuid(301), chapter: 7, difficulty: 'dificil', order_index: 15, source_type: 'texto_biblico',
    question: 'Como Daniel descreve o quarto animal da visão do capítulo 7?',
    option_a: 'Semelhante a um leopardo com quatro asas',
    option_b: 'Terrível, espantoso e muito forte, com grandes dentes de ferro e dez chifres',
    option_c: 'Semelhante a um leão com asas de águia',
    option_d: 'Semelhante a um urso levantado de um lado',
    correct_answer: 'B',
    explanation:
      'Daniel 7:7: o quarto animal era "terrível, espantoso e sobremodo forte", com enormes dentes de ferro, que devorava, fazia em pedaços e pisava aos pés o que sobrava; era diferente de todos os animais anteriores e tinha dez chifres. O leão com asas de águia é o primeiro animal (v.4), o urso é o segundo (v.5) e o leopardo de quatro cabeças é o terceiro (v.6).',
    hint: 'Não se parece com nenhum animal conhecido — por isso Daniel não lhe dá nome.',
  },
  {
    id: uuid(302), chapter: 8, difficulty: 'dificil', order_index: 16, source_type: 'texto_biblico',
    question: 'Na visão de Daniel 8, o que o carneiro com dois chifres representa, segundo a explicação do próprio texto?',
    option_a: 'Os reis da Grécia', option_b: 'O reino de Roma', option_c: 'Os reis da Média e da Pérsia', option_d: 'Os reinos de Israel e Judá',
    correct_answer: 'C',
    explanation:
      'Daniel 8:20: "O carneiro com dois chifres, que viste, são os reis da Média e da Pérsia." O versículo 21 completa: "Mas o bode peludo é o rei da Grécia; o chifre grande entre os olhos é o primeiro rei." Essa é uma identificação dada pelo próprio texto bíblico, através do anjo Gabriel.',
    hint: 'O bode peludo é a Grécia — o carneiro vem antes dele.',
  },
  {
    id: uuid(303), chapter: 9, difficulty: 'dificil', order_index: 17, source_type: 'texto_biblico',
    question: 'A profecia das setenta semanas (Daniel 9:24-27) foi dada em resposta a quê?',
    option_a: 'À leitura que Daniel fez do livro de Jeremias sobre os setenta anos de cativeiro',
    option_b: 'À visão dos quatro animais do capítulo 7',
    option_c: 'À queda de Babilônia nas mãos de Dario',
    option_d: 'Ao sonho da estátua de Nabucodonosor',
    correct_answer: 'A',
    explanation:
      'Daniel 9:2-3: "No primeiro ano do seu reinado, eu, Daniel, entendi, pelos livros, que o número de anos, de que falara o Senhor ao profeta Jeremias, que haviam de durar as assolações de Jerusalém, era de setenta anos. Voltei o rosto ao Senhor Deus, para o buscar com oração e súplicas, com jejum, pano de saco e cinza." A resposta veio pelo anjo Gabriel (9:21-27). Interpretação: o sentido das setenta semanas e do que ocorre na septuagésima semana é objeto de diferentes leituras teológicas (dispensacionalista, messiânica, preterista e histórico-crítica). O dado textual objetivo é apenas este: a profecia nasce da leitura de Jeremias.',
    hint: 'Jeremias falou de setenta anos, não de setenta semanas.',
  },
  {
    id: uuid(304), chapter: 10, difficulty: 'dificil', order_index: 18, source_type: 'texto_biblico',
    question: 'Quanto tempo Daniel ficou jejuando antes da visão do capítulo 10, e quem o impediu por vinte e um dias?',
    option_a: 'Sete dias, impedido pelo príncipe da Babilônia',
    option_b: 'Três semanas (vinte e um dias), impedido pelo príncipe do reino da Pérsia, até que Miguel veio ajudá-lo',
    option_c: 'Quarenta dias, impedido por Satanás',
    option_d: 'Dez dias, impedido pelo rei Ciro',
    correct_answer: 'B',
    explanation:
      'Daniel 10:2-3 e 10:12-13: Daniel esteve três semanas inteiras sem comer manjar desejável, carne nem vinho. O mensageiro diz: "Não temas, Daniel, porque desde o primeiro dia... as tuas palavras foram ouvidas... mas o príncipe do reino da Pérsia me resistiu por vinte e um dias; eis que Miguel, um dos primeiros príncipes, veio para ajudar-me."',
    hint: 'O jejum durou o mesmo número de dias que a resistência do príncipe da Pérsia.',
  },
  {
    id: uuid(305), chapter: 11, difficulty: 'dificil', order_index: 19, source_type: 'historico',
    question: 'Sobre o "rei poderoso" de Daniel 11:3-4, o que o texto afirma?',
    option_a: 'Seu reino passaria intacto aos seus descendentes por quatro gerações',
    option_b: 'Ele reinaria por setenta anos e morreria em Babilônia',
    option_c: 'Seu domínio seria repartido para os quatro ventos do céu, mas não para a sua posteridade, nem segundo o poder com que reinou',
    option_d: 'Ele seria morto por um dos seus generais dentro do templo',
    correct_answer: 'C',
    explanation:
      'Daniel 11:3-4: "Levantar-se-á um rei poderoso, que reinará com grande domínio e fará o que lhe aprouver. Mas, no auge, o seu reino será quebrado e repartido para os quatro ventos do céu; mas não para a sua posteridade, nem segundo o poder com que reinou, porque o seu reino será arrancado e passará a outros, fora de seus descendentes." Consenso histórico: a descrição corresponde a Alexandre, o Grande, cujo império foi dividido entre quatro generais (Ptolomeu, Seleuco, Cassandro e Lisímaco) — não entre seus filhos.',
    hint: 'O reino seria dividido em quatro partes e ficaria fora da família dele.',
  },
  {
    id: uuid(306), chapter: 12, difficulty: 'dificil', order_index: 20, source_type: 'interpretacao',
    question: 'O que Daniel 12:11-12 afirma sobre os 1.290 e os 1.335 dias?',
    option_a: 'São os dias de vida de Nabucodonosor',
    option_b: 'Da abominação desoladora até o fim há 1.290 dias, e bem-aventurado o que espera e chega aos 1.335 dias',
    option_c: 'São os dias do cativeiro babilônico, somando 2.625',
    option_d: 'Representam os anos do reinado de Ciro',
    correct_answer: 'B',
    explanation:
      'Daniel 12:11-12: "Desde o tempo em que o sacrifício diário for tirado e posta a abominação desoladora, haverá mil duzentos e noventa dias. Bem-aventurado o que espera e chega até mil trezentos e trinta e cinco dias." Interpretação: o cumprimento desses números é objeto de diferentes leituras teológicas (histórica/antíoco Epifânio, escatológica/futurista, simbólica/idealista). O texto em si apenas enuncia os dois números e a bem-aventurança final, sem explicar a diferença de quarenta e cinco dias entre eles.',
    hint: 'Um número termina a contagem; o outro traz uma bem-aventurança.',
  },
];

export const ACHIEVEMENTS = [
  { id: '11111111-1111-4111-8111-111111111111', code: 'FIRST_GAME', name: 'Primeira Partida', icon: '🎯',
    description: 'Complete a sua primeira partida no Quiz de Daniel.',
    criteria: { type: 'attempts_count', value: 1 } },
  { id: '11111111-1111-4111-8111-111111111112', code: 'FIVE_GAMES', name: '5 Partidas', icon: '🔥',
    description: 'Complete 5 partidas.', criteria: { type: 'attempts_count', value: 5 } },
  { id: '11111111-1111-4111-8111-111111111113', code: 'TEN_GAMES', name: '10 Partidas', icon: '⚡',
    description: 'Complete 10 partidas.', criteria: { type: 'attempts_count', value: 10 } },
  { id: '11111111-1111-4111-8111-111111111114', code: 'PERFECT_SCORE', name: '100% de Acertos', icon: '💯',
    description: 'Termine uma partida com todas as respostas corretas.',
    criteria: { type: 'perfect_attempt', value: true } },
  { id: '11111111-1111-4111-8111-111111111115', code: 'TOP_TEN', name: 'Top 10', icon: '🏅',
    description: 'Entre no top 10 do ranking geral.', criteria: { type: 'leaderboard_position', value: 10 } },
  { id: '11111111-1111-4111-8111-111111111116', code: 'FIRST_PLACE', name: '1º Lugar', icon: '👑',
    description: 'Alcance o 1º lugar do ranking geral.', criteria: { type: 'leaderboard_position', value: 1 } },
  { id: '11111111-1111-4111-8111-111111111117', code: 'DANIEL_EXPERT', name: 'Especialista em Daniel', icon: '📖',
    description: 'Acumule 100 respostas corretas e alcance 85% ou mais de acerto.',
    criteria: { type: 'expert', correct: 100, min_accuracy: 85 } },
];

export default { QUESTIONS, ACHIEVEMENTS };
