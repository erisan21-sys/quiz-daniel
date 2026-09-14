/**
 * QUIZ BÍBLICO · Banco de perguntas — OSÉIAS (50 questões)
 * 15 fáceis · 20 médias · 15 difíceis · Capítulos 1 a 14
 * Todas as perguntas, alternativas, explicações e dicas referem-se
 * exclusivamente ao livro de Oséias.
 */

const uuid = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`;

export const OSEIAS_QUESTIONS = [
  // ================================================================ FÁCEIS
  {
    id: uuid('010000000101'), book_id: 'oseias', chapter: 1, difficulty: 'facil', order_index: 1, source_type: 'texto_biblico',
    question: 'Quem era o pai do profeta Oséias?',
    option_a: 'Beeri', option_b: 'Joás', option_c: 'Diblaim', option_d: 'Bezalel',
    correct_answer: 'A',
    explanation:
      'Oséias 1:1: "Palavra do Senhor, que veio a Oséias, filho de Beeri, nos dias de Uzias, Jotão, Acaz e Ezequias, reis de Judá, e nos dias de Jeroboão, filho de Joás, rei de Israel."',
    hint: 'O nome aparece logo no primeiro versículo do livro.',
  },
  {
    id: uuid('010000000102'), book_id: 'oseias', chapter: 1, difficulty: 'facil', order_index: 2, source_type: 'texto_biblico',
    question: 'Qual era o nome da mulher de Oséias?',
    option_a: 'Rute', option_b: 'Gômer', option_c: 'Noemia', option_d: 'Tamar',
    correct_answer: 'B',
    explanation:
      'Oséias 1:3: Oséias "foi e tomou a Gômer, filha de Diblaim". O casamento do profeta com Gômer é o grande sinal vivo do livro: retrata o amor fiel de Deus por Israel, mesmo diante da infidelidade do povo.',
    hint: 'Ela era filha de Diblaim.',
  },
  {
    id: uuid('010000000103'), book_id: 'oseias', chapter: 1, difficulty: 'facil', order_index: 3, source_type: 'texto_biblico',
    question: 'Qual foi o nome do primeiro filho de Oséias?',
    option_a: 'Jezreel', option_b: 'Lo-Ami', option_c: 'Maer-Salal', option_d: 'Gersom',
    correct_answer: 'A',
    explanation:
      'Oséias 1:4: "Põe-lhe o nome de Jezreel, porque, daqui a pouco, castigarei o sangue de Jezreel sobre a casa de Jeú." Jezreel significa "Deus semeia/espalha" e lembra o vale onde Jeú derramou sangue (2 Reis 9–10).',
    hint: 'É também o nome de um vale famoso em Israel.',
  },
  {
    id: uuid('010000000104'), book_id: 'oseias', chapter: 1, difficulty: 'facil', order_index: 4, source_type: 'texto_biblico',
    question: 'O que significa o nome "Lo-Ami", dado ao terceiro filho de Oséias?',
    option_a: 'Deus conosco', option_b: 'Filho da promessa', option_c: 'Vocês não são meu povo', option_d: 'Misericórdia encontrada',
    correct_answer: 'C',
    explanation:
      'Oséias 1:9: "Põe-lhe o nome de Lo-Ami, porque vós não sois meu povo, nem eu serei vosso Deus." O próprio texto traduz o nome. Mais tarde, em 2:23, Deus reverte a sentença: dirá a Lo-Ami "Tu és meu povo".',
    hint: 'O próprio versículo traduz o nome logo em seguida.',
  },
  {
    id: uuid('010000000105'), book_id: 'oseias', chapter: 6, difficulty: 'facil', order_index: 5, source_type: 'texto_biblico',
    question: 'Complete a frase de Oséias 6:6: "Misericórdia quero, e não ___".',
    option_a: 'jejum', option_b: 'oração', option_c: 'sacrifício', option_d: 'oferta de manjares',
    correct_answer: 'C',
    explanation:
      'Oséias 6:6: "Porque misericórdia quero, e não sacrifício, e o conhecimento de Deus, mais do que holocaustos." Jesus citou esse versículo duas vezes (Mateus 9:13 e 12:7) para mostrar que Deus valoriza o coração fiel acima do ritual vazio.',
    hint: 'Jesus citou essa frase ao falar com os fariseus.',
  },
  {
    id: uuid('010000000106'), book_id: 'oseias', chapter: 4, difficulty: 'facil', order_index: 6, source_type: 'texto_biblico',
    question: 'Complete Oséias 4:6: "O meu povo está sendo destruído porque lhe falta ___".',
    option_a: 'o conhecimento', option_b: 'a força', option_c: 'o ouro', option_d: 'um rei',
    correct_answer: 'A',
    explanation:
      'Oséias 4:6: "O meu povo está sendo destruído, porque lhe falta o conhecimento. Porque tu rejeitaste o conhecimento, também eu te rejeitarei." A ignorância da Palavra de Deus é apontada como causa da ruína de Israel.',
    hint: 'É algo que se aprende ouvindo a Palavra de Deus.',
  },
  {
    id: uuid('010000000107'), book_id: 'oseias', chapter: 8, difficulty: 'facil', order_index: 7, source_type: 'texto_biblico',
    question: 'Complete o provérbio de Oséias 8:7: "Semeiam ventos e segarão ___".',
    option_a: 'flores', option_b: 'tormentas', option_c: 'espinhos', option_d: 'uvas bravas',
    correct_answer: 'B',
    explanation:
      'Oséias 8:7: "Porque semeiam o vento e segarão a tormenta." O provérbio ensina a lei da semeadura: alianças erradas e idolatria trariam uma colheita de destruição muito maior do que o plantio.',
    hint: 'É uma tempestade bem maior do que uma brisa.',
  },
  {
    id: uuid('010000000108'), book_id: 'oseias', chapter: 14, difficulty: 'facil', order_index: 8, source_type: 'texto_biblico',
    question: 'Quantos capítulos tem o livro de Oséias?',
    option_a: '10', option_b: '12', option_c: '14', option_d: '16',
    correct_answer: 'C',
    explanation:
      'O livro de Oséias possui 14 capítulos. Os capítulos 1 a 3 usam o casamento do profeta como parábola viva; os capítulos 4 a 13 trazem denúncias e juízos; o capítulo 14 encerra com o chamado ao arrependimento e promessas de restauração.',
    hint: 'É o primeiro dos Profetas Menores e um dos mais longos entre eles.',
  },
  {
    id: uuid('010000000109'), book_id: 'oseias', chapter: 11, difficulty: 'facil', order_index: 9, source_type: 'texto_biblico',
    question: 'Complete Oséias 11:1: "Quando Israel era menino, eu o amei, e do ___ chamei o meu filho".',
    option_a: 'deserto', option_b: 'Egito', option_c: 'cativeiro da Babilônia', option_d: 'monte Sinai',
    correct_answer: 'B',
    explanation:
      'Oséias 11:1: "Quando Israel era menino, eu o amei; e do Egito chamei o meu filho." O versículo recorda o Êxodo e foi aplicado por Mateus 2:15 à volta do menino Jesus do Egito.',
    hint: 'Foi de lá que Deus tirou o povo com mão forte no Êxodo.',
  },
  {
    id: uuid('010000000110'), book_id: 'oseias', chapter: 2, difficulty: 'facil', order_index: 10, source_type: 'texto_biblico',
    question: 'Em Oséias 2, Deus promete se desposar (casar) com Israel em quê?',
    option_a: 'Em riquezas e palácios', option_b: 'Em guerras e conquistas', option_c: 'Em silêncio e distância', option_d: 'Em fidelidade',
    correct_answer: 'D',
    explanation:
      'Oséias 2:19-20: "Desposar-te-ei comigo em justiça, em juízo, em benignidade e em misericórdias; desposar-te-ei comigo em fidelidade, e conhecerás ao Senhor." O casamento restaurado é a imagem do relacionamento renovado entre Deus e Israel.',
    hint: 'É o oposto da infidelidade que marcou o povo.',
  },
  {
    id: uuid('010000000111'), book_id: 'oseias', chapter: 14, difficulty: 'facil', order_index: 11, source_type: 'texto_biblico',
    question: 'Qual é o grande chamado do último capítulo de Oséias?',
    option_a: 'Fugir para o Egito', option_b: 'Voltar para o Senhor', option_c: 'Reconstruir os muros', option_d: 'Coroar um novo rei',
    correct_answer: 'B',
    explanation:
      'Oséias 14:1-2: "Volta, ó Israel, para o Senhor, teu Deus... Tomai convosco palavras e voltai-vos ao Senhor." Depois de todas as denúncias, o livro termina com um convite ao arrependimento e promessas de cura e amor (14:4).',
    hint: 'Começa com "Volta, ó Israel…".',
  },
  {
    id: uuid('010000000112'), book_id: 'oseias', chapter: 7, difficulty: 'facil', order_index: 12, source_type: 'texto_biblico',
    question: 'Em Oséias 7:8, Efraim é comparado a um bolo que…',
    option_a: 'cresceu demais e transbordou', option_b: 'não foi virado', option_c: 'foi feito sem fermento', option_d: 'alimentou uma multidão',
    correct_answer: 'B',
    explanation:
      'Oséias 7:8: "Efraim se mistura com os povos; Efraim é um bolo que não foi virado." Assado só de um lado, o bolo queima por baixo e fica cru por cima: retrato de um povo pela metade, misturado com as nações.',
    hint: 'O problema é que ele foi assado de um lado só.',
  },
  {
    id: uuid('010000000113'), book_id: 'oseias', chapter: 7, difficulty: 'facil', order_index: 13, source_type: 'texto_biblico',
    question: 'Em Oséias 7:11, Efraim é comparado a qual ave?',
    option_a: 'Águia', option_b: 'Corvo', option_c: 'Pomba', option_d: 'Andorinha',
    correct_answer: 'C',
    explanation:
      'Oséias 7:11: "Efraim é como uma pomba enganada, sem entendimento; invocam o Egito, vão para a Assíria." A pomba ingênua voa de um lado para outro: Israel buscava socorro ora no Egito, ora na Assíria, em vez de confiar em Deus.',
    hint: 'É uma ave conhecida por ser mansa e fácil de enganar.',
  },
  {
    id: uuid('010000000114'), book_id: 'oseias', chapter: 13, difficulty: 'facil', order_index: 14, source_type: 'texto_biblico',
    question: 'Complete Oséias 13:14: "Ó morte, onde estão as tuas ___?"',
    option_a: 'pragas', option_b: 'correntes', option_c: 'armadilhas', option_d: 'trevas',
    correct_answer: 'A',
    explanation:
      'Oséias 13:14: "Ó morte, onde estão as tuas pragas? Ó inferno, onde está a tua destruição?" Paulo ecoa essa vitória sobre a morte em 1 Coríntios 15:55: "Onde está, ó morte, a tua vitória?"',
    hint: 'Paulo cita esse triunfo sobre a morte em 1 Coríntios 15.',
  },
  {
    id: uuid('010000000115'), book_id: 'oseias', chapter: 1, difficulty: 'facil', order_index: 15, source_type: 'texto_biblico',
    question: 'Oséias profetizou principalmente para qual reino?',
    option_a: 'O reino do Sul (Judá)', option_b: 'O reino do Norte (Israel/Efraim)', option_c: 'O reino de Edom', option_d: 'O império da Babilônia',
    correct_answer: 'B',
    explanation:
      'Embora cite reis de Judá na introdução (1:1), Oséias dirigiu sua mensagem sobretudo ao reino do Norte, chamado no livro de "Israel", "Efraim" e "Samaria". Ele viveu nos últimos dias antes da queda de Samaria diante da Assíria (722 a.C.).',
    hint: 'No livro, esse reino é chamado muitas vezes de "Efraim".',
  },

  // ================================================================ MÉDIAS
  {
    id: uuid('010000000201'), book_id: 'oseias', chapter: 1, difficulty: 'medio', order_index: 16, source_type: 'texto_biblico',
    question: 'Qual foi o nome da filha de Oséias?',
    option_a: 'Lo-Ruama', option_b: 'Ruama', option_c: 'Jezreel', option_d: 'Ami',
    correct_answer: 'A',
    explanation:
      'Oséias 1:6: Gômer "concebeu e deu à luz uma filha. Disse-lhe o Senhor: Põe-lhe o nome de Lo-Ruama, porque eu não tornarei a compadecer-me da casa de Israel." Lo-Ruama significa "não amada / não alcançou misericórdia".',
    hint: 'O nome começa com "Lo-", que em hebraico nega a palavra seguinte.',
  },
  {
    id: uuid('010000000202'), book_id: 'oseias', chapter: 1, difficulty: 'medio', order_index: 17, source_type: 'texto_biblico',
    question: 'Qual rei de Israel é citado em Oséias 1:1?',
    option_a: 'Acabe, filho de Onri', option_b: 'Jeú, filho de Josafá', option_c: 'Jeroboão, filho de Joás', option_d: 'Peca, filho de Remalias',
    correct_answer: 'C',
    explanation:
      'Oséias 1:1 situa o ministério do profeta "nos dias de Jeroboão, filho de Joás, rei de Israel" (Jeroboão II). Foi um tempo de prosperidade material e decadência espiritual no reino do Norte, como também mostra o profeta Amós, seu contemporâneo.',
    hint: 'É o rei do longo reinado próspero do século VIII a.C., filho de Joás.',
  },
  {
    id: uuid('010000000203'), book_id: 'oseias', chapter: 2, difficulty: 'medio', order_index: 18, source_type: 'texto_biblico',
    question: 'Segundo Oséias 2:15, o vale de Acor se tornaria o quê?',
    option_a: 'Um campo de batalha', option_b: 'Uma porta de esperança', option_c: 'Um deserto sem água', option_d: 'Um lugar de exílio',
    correct_answer: 'B',
    explanation:
      'Oséias 2:15: "Dar-lhe-ei as suas vinhas dali e o vale de Acor por porta de esperança." O vale de Acor, marcado pelo pecado de Acã (Josué 7), seria transformado em símbolo de novo começo.',
    hint: 'O lugar da antiga derrota viraria símbolo de recomeço.',
  },
  {
    id: uuid('010000000204'), book_id: 'oseias', chapter: 3, difficulty: 'medio', order_index: 19, source_type: 'texto_biblico',
    question: 'O que Oséias pagou para readquirir Gômer, segundo Oséias 3:2?',
    option_a: 'Trinta peças de prata', option_b: 'Sete cordeiros', option_c: 'Quinze peças de prata e cevada', option_d: 'Um par de bois',
    correct_answer: 'C',
    explanation:
      'Oséias 3:2: "Comprei-a, pois, para mim por quinze peças de prata, e um ômer e meio de cevada." O preço humilde pago pelo profeta ilustra o resgate amoroso com que Deus tornaria a buscar Israel.',
    hint: 'Foram quinze peças de prata mais uma medida de cereal.',
  },
  {
    id: uuid('010000000205'), book_id: 'oseias', chapter: 3, difficulty: 'medio', order_index: 20, source_type: 'texto_biblico',
    question: 'Segundo Oséias 3:4, os filhos de Israel ficariam muitos dias sem o quê?',
    option_a: 'Sem pão e sem água', option_b: 'Sem rei e sem príncipe', option_c: 'Sem filhos e sem filhas', option_d: 'Sem portas e sem muros',
    correct_answer: 'B',
    explanation:
      'Oséias 3:4: "Porque os filhos de Israel ficarão por muitos dias sem rei, sem príncipe, sem sacrifício, sem coluna, sem éfode e sem terafins." Depois, "tornarão e buscarão ao Senhor... e a Davi, seu rei" (3:5).',
    hint: 'A lista começa com duas autoridades: uma maior e uma menor.',
  },
  {
    id: uuid('010000000206'), book_id: 'oseias', chapter: 4, difficulty: 'medio', order_index: 21, source_type: 'texto_biblico',
    question: 'Complete Oséias 4:17: "Efraim está entregue aos ___; deixa-o".',
    option_a: 'assírios', option_b: 'ídolos', option_c: 'mercadores', option_d: 'leões',
    correct_answer: 'B',
    explanation:
      'Oséias 4:17: "Efraim está entregue aos ídolos; deixa-o." É um dos versículos mais solenes do livro: Deus entrega o povo obstinado às consequências da sua própria idolatria.',
    hint: 'É aquilo que o povo adorava em vez de Deus.',
  },
  {
    id: uuid('010000000207'), book_id: 'oseias', chapter: 4, difficulty: 'medio', order_index: 22, source_type: 'texto_biblico',
    question: 'Em Oséias 4:15, Deus diz: "Não venhais a ___".',
    option_a: 'Jerusalém', option_b: 'Gilgal', option_c: 'Hebrom', option_d: 'Belém',
    correct_answer: 'B',
    explanation:
      'Oséias 4:15: "Se tu, ó Israel, queres prostituir-te, ao menos não se faça culpado Judá; não venhais a Gilgal, e não subais a Bete-Áven." Gilgal e Bete-Áven (apelido de Betel, "casa da iniquidade") eram centros de culto idólatra.',
    hint: 'É o mesmo lugar onde Israel acampou ao entrar em Canaã, agora corrompido.',
  },
  {
    id: uuid('010000000208'), book_id: 'oseias', chapter: 5, difficulty: 'medio', order_index: 23, source_type: 'texto_biblico',
    question: 'Complete Oséias 5:8: "Tocai a trombeta em Gibeá, a buzina em ___".',
    option_a: 'Ramá', option_b: 'Jericó', option_c: 'Samaria', option_d: 'Dã',
    correct_answer: 'A',
    explanation:
      'Oséias 5:8: "Tocai a trombeta em Gibeá, a buzina em Ramá; gritai em Bete-Áven: após ti, ó Benjamim!" O toque de alarme anuncia a invasão iminente sobre o reino.',
    hint: 'É uma cidade de Benjamim, perto de Gibeá.',
  },
  {
    id: uuid('010000000209'), book_id: 'oseias', chapter: 5, difficulty: 'medio', order_index: 24, source_type: 'texto_biblico',
    question: 'Em Oséias 5:14, Deus diz que será para Efraim como um…',
    option_a: 'cordeiro', option_b: 'leão', option_c: 'lobo', option_d: 'urso',
    correct_answer: 'B',
    explanation:
      'Oséias 5:14: "Porque para Efraim serei como um leão e para a casa de Judá, como um leãozinho; eu, eu mesmo, despedaçarei e ir-me-ei embora." A imagem do leão mostra um juízo irresistível.',
    hint: 'É o rei dos animais, símbolo de força irresistível.',
  },
  {
    id: uuid('010000000210'), book_id: 'oseias', chapter: 6, difficulty: 'medio', order_index: 25, source_type: 'texto_biblico',
    question: 'Complete Oséias 6:2: "Depois de dois dias, nos revigorará; ao terceiro dia, nos ___".',
    option_a: 'julgará', option_b: 'espalhará', option_c: 'levantará', option_d: 'esconderá',
    correct_answer: 'C',
    explanation:
      'Oséias 6:2: "Depois de dois dias, nos revigorará; ao terceiro dia, nos levantará, e viveremos diante dele." A restauração após o juízo é descrita como uma ressurreição — linguagem que o Novo Testamento cumpre em Cristo.',
    hint: 'É o mesmo verbo usado para ressuscitar.',
  },
  {
    id: uuid('010000000211'), book_id: 'oseias', chapter: 6, difficulty: 'medio', order_index: 26, source_type: 'texto_biblico',
    question: 'Em Oséias 6:4, a bondade do povo é comparada à…',
    option_a: 'nuvem da manhã', option_b: 'rocha do deserto', option_c: 'oliveira verde', option_d: 'estrela da alva',
    correct_answer: 'A',
    explanation:
      'Oséias 6:4: "A vossa bondade é como a nuvem da manhã, como o orvalho da madrugada, que cedo passa." O arrependimento de Israel era superficial e passageiro, evaporando como a neblina.',
    hint: 'É algo que some logo que o sol esquenta.',
  },
  {
    id: uuid('010000000212'), book_id: 'oseias', chapter: 8, difficulty: 'medio', order_index: 27, source_type: 'texto_biblico',
    question: 'Complete Oséias 8:6: "O bezerro de ___ será despedaçado".',
    option_a: 'Dã', option_b: 'Betel', option_c: 'Samaria', option_d: 'Siquém',
    correct_answer: 'C',
    explanation:
      'Oséias 8:5-6: "O teu bezerro, ó Samaria, é rejeitado... Porque o bezerro de Samaria será feito em pedaços." Os bezerros de ouro de Jeroboão I (Betel e Dã) são aqui associados à capital Samaria, centro da idolatria.',
    hint: 'É a capital do reino do Norte.',
  },
  {
    id: uuid('010000000213'), book_id: 'oseias', chapter: 8, difficulty: 'medio', order_index: 28, source_type: 'texto_biblico',
    question: 'Segundo Oséias 8:12, como Israel tratou as grandezas da lei de Deus?',
    option_a: 'Como tesouro precioso', option_b: 'Como coisa estranha', option_c: 'Como cântico novo', option_d: 'Como herança dos pais',
    correct_answer: 'B',
    explanation:
      'Oséias 8:12: "Escrevi para ele as grandezas da minha lei, mas isso é tido como coisa estranha." Israel considerava a Palavra de Deus algo alheio, sem valor prático — retrato da irreverência do povo.',
    hint: 'Eles agiam como se a lei fosse algo estrangeiro.',
  },
  {
    id: uuid('010000000214'), book_id: 'oseias', chapter: 9, difficulty: 'medio', order_index: 29, source_type: 'texto_biblico',
    question: 'Complete Oséias 9:10: "Como uvas no deserto achei a ___".',
    option_a: 'Judá', option_b: 'Israel', option_c: 'Efraim somente', option_d: 'Benjamim',
    correct_answer: 'B',
    explanation:
      'Oséias 9:10: "Como uvas no deserto achei a Israel, como figos temporãos na figueira nova vi a vossos pais." Deus lembra com ternura o início da história com o povo, antes da idolatria de Baal-Peor.',
    hint: 'É o nome do povo inteiro escolhido por Deus.',
  },
  {
    id: uuid('010000000215'), book_id: 'oseias', chapter: 9, difficulty: 'medio', order_index: 30, source_type: 'texto_biblico',
    question: 'Segundo Oséias 9:15, onde se achava toda a maldade de Israel?',
    option_a: 'Em Jerusalém', option_b: 'Em Gilgal', option_c: 'Em Tiro', option_d: 'Em Damasco',
    correct_answer: 'B',
    explanation:
      'Oséias 9:15: "Toda a sua maldade se acha em Gilgal, porque ali passei a aborrecê-los." Gilgal, que fora lugar de bênção na conquista, tornara-se centro de culto falso; Amós também denunciou Gilgal (Amós 4:4; 5:5).',
    hint: 'É o mesmo lugar citado em Oséias 4:15.',
  },
  {
    id: uuid('010000000216'), book_id: 'oseias', chapter: 10, difficulty: 'medio', order_index: 31, source_type: 'texto_biblico',
    question: 'Em Oséias 10:1, Israel é comparado a uma vide…',
    option_a: 'seca', option_b: 'luxuriante', option_c: 'arrancada', option_d: 'plantada junto a rios',
    correct_answer: 'B',
    explanation:
      'Oséias 10:1: "Israel é vide luxuriante, que dá o fruto para si mesmo." A prosperidade existia, mas era egoísta: quanto mais fruto, mais altares idólatras o povo erguia.',
    hint: 'A planta era viçosa, mas o fruto era só para si mesma.',
  },
  {
    id: uuid('010000000217'), book_id: 'oseias', chapter: 10, difficulty: 'medio', order_index: 32, source_type: 'texto_biblico',
    question: 'Complete Oséias 10:12: "Arai o campo de ___".',
    option_a: 'trigo', option_b: 'pousio', option_c: 'cevada', option_d: 'batalha',
    correct_answer: 'B',
    explanation:
      'Oséias 10:12: "Semeai para vós outros em justiça, ceifai segundo a misericórdia; arai o campo de pousio; porque é tempo de buscar ao Senhor." Pousio é a terra descansada que precisa ser arada: o coração endurecido precisava ser quebrado pelo arrependimento.',
    hint: 'É a terra que ficou sem plantar e endureceu.',
  },
  {
    id: uuid('010000000218'), book_id: 'oseias', chapter: 10, difficulty: 'medio', order_index: 33, source_type: 'texto_biblico',
    question: 'Segundo Oséias 10:7, o rei de Samaria será destruído como…',
    option_a: 'palha no fogo', option_b: 'espuma sobre a água', option_c: 'pó ao vento', option_d: 'cera diante do fogo',
    correct_answer: 'B',
    explanation:
      'Oséias 10:7: "O rei de Samaria será destruído como a espuma sobre a face da água." A monarquia do Norte, instável e cheia de golpes, desapareceria com facilidade diante do juízo.',
    hint: 'É algo que some na superfície da água em segundos.',
  },
  {
    id: uuid('010000000219'), book_id: 'oseias', chapter: 11, difficulty: 'medio', order_index: 34, source_type: 'texto_biblico',
    question: 'Complete Oséias 11:4: "Com cordas humanas os atraí, com laços de ___".',
    option_a: 'ferro', option_b: 'amor', option_c: 'ouro', option_d: 'guerra',
    correct_answer: 'B',
    explanation:
      'Oséias 11:4: "Com cordas humanas os atraí, com laços de amor; fui para eles como quem tira o jugo de sobre as suas queixadas e lhes dou de comer." É uma das mais ternas descrições do cuidado de Deus em todo o Antigo Testamento.',
    hint: 'É com isso que Deus atrai, não com violência.',
  },
  {
    id: uuid('010000000220'), book_id: 'oseias', chapter: 12, difficulty: 'medio', order_index: 35, source_type: 'texto_biblico',
    question: 'Segundo Oséias 12:3, quem pegou o calcanhar do irmão ainda no ventre?',
    option_a: 'Esaú', option_b: 'Jacó', option_c: 'José', option_d: 'Benjamim',
    correct_answer: 'B',
    explanation:
      'Oséias 12:3-4: "No ventre pegou do calcanhar de seu irmão; no seu vigor lutou com Deus; lutou com o anjo e prevaleceu." O profeta usa a história de Jacó (Gênesis 25:26; 32:24-30) como lição para os descendentes.',
    hint: 'O nome dele está ligado à palavra "calcanhar".',
  },

  // =============================================================== DIFÍCEIS
  {
    id: uuid('010000000301'), book_id: 'oseias', chapter: 2, difficulty: 'dificil', order_index: 36, source_type: 'texto_biblico',
    question: 'Em Oséias 2:19, com qual palavra começa a promessa do desposório: "Desposar-te-ei comigo em ___"?',
    option_a: 'Justiça', option_b: 'Paz', option_c: 'Glória', option_d: 'Alegria',
    correct_answer: 'A',
    explanation:
      'Oséias 2:19: "Desposar-te-ei comigo em justiça, em juízo, em benignidade e em misericórdias." A sequência justiça–juízo–benignidade–misericórdia–fidelidade (v. 20) descreve o caráter da aliança restaurada.',
    hint: 'É a primeira de cinco palavras; a última é "fidelidade".',
  },
  {
    id: uuid('010000000302'), book_id: 'oseias', chapter: 4, difficulty: 'dificil', order_index: 37, source_type: 'texto_biblico',
    question: 'Complete Oséias 4:19: "O vento os envolveu nas suas ___".',
    option_a: 'mãos', option_b: 'asas', option_c: 'redes', option_d: 'cordas',
    correct_answer: 'B',
    explanation:
      'Oséias 4:19: "O vento os envolveu nas suas asas, e envergonhar-se-ão por causa dos seus sacrifícios." O juízo levaria o povo como o vento carrega a palha; a idolatria terminaria em vergonha.',
    hint: 'O vento é retratado como uma grande ave que carrega o povo.',
  },
  {
    id: uuid('010000000303'), book_id: 'oseias', chapter: 5, difficulty: 'dificil', order_index: 38, source_type: 'texto_biblico',
    question: 'Segundo Oséias 5:13, Efraim, ao ver sua enfermidade, recorreu ao rei…',
    option_a: 'Jarebe', option_b: 'Senaqueribe', option_c: 'Faraó', option_d: 'Ben-Hadade',
    correct_answer: 'A',
    explanation:
      'Oséias 5:13: "Efraim viu a sua enfermidade, e Judá, a sua chaga; foi Efraim para a Assíria e enviou mensageiros ao rei Jarebe." Jarebe ("o que contende/defende") é provavelmente um título irônico do rei assírio, que de nada valeria: "ele não poderá curar-vos".',
    hint: 'É um nome que aparece só aqui e em 10:6, ligado à Assíria.',
  },
  {
    id: uuid('010000000304'), book_id: 'oseias', chapter: 5, difficulty: 'dificil', order_index: 39, source_type: 'texto_biblico',
    question: 'Complete Oséias 5:1: os sacerdotes foram "um laço em Mispá e rede estendida sobre o ___".',
    option_a: 'Carmelo', option_b: 'Tabor', option_c: 'Hermom', option_d: 'Gerizim',
    correct_answer: 'B',
    explanation:
      'Oséias 5:1: "Ouvi isto, ó sacerdotes... porque fostes um laço em Mispá e rede estendida sobre o Tabor." Em vez de guiar o povo, os líderes religiosos eram armadilhas; Mispá e Tabor eram lugares altos ligados ao culto corrupto.',
    hint: 'É o monte isolado da Galileia, palco da Transfiguração segundo a tradição.',
  },
  {
    id: uuid('010000000305'), book_id: 'oseias', chapter: 6, difficulty: 'dificil', order_index: 40, source_type: 'texto_biblico',
    question: 'Complete Oséias 6:7: "Mas eles, como ___, transgrediram a aliança".',
    option_a: 'Caim', option_b: 'Adão', option_c: 'Saul', option_d: 'Acabe',
    correct_answer: 'B',
    explanation:
      'Oséias 6:7: "Mas eles, como Adão, transgrediram a aliança e se houveram aleivosamente contra mim." (Algumas traduções leem "em Adã", nome de cidade; a ARA segue "como Adão", ligando a quebra da aliança à queda no Éden.)',
    hint: 'É o primeiro homem, que quebrou a primeira aliança no Éden.',
  },
  {
    id: uuid('010000000306'), book_id: 'oseias', chapter: 6, difficulty: 'dificil', order_index: 41, source_type: 'texto_biblico',
    question: 'Segundo Oséias 6:8, Gileade é descrita como…',
    option_a: 'cidade de malfeitores', option_b: 'terra de fartura', option_c: 'refúgio dos justos', option_d: 'fonte de bálsamo',
    correct_answer: 'A',
    explanation:
      'Oséias 6:8: "Gileade é cidade de malfeitores, manchada de sangue." A região da Transjordânia, famosa pelo "bálsamo de Gileade", é denunciada pela violência; o versículo seguinte acusa bandos de sacerdotes que assassinavam em Siquém (6:9).',
    hint: 'A famosa terra do bálsamo é acusada de violência e sangue.',
  },
  {
    id: uuid('010000000307'), book_id: 'oseias', chapter: 7, difficulty: 'dificil', order_index: 42, source_type: 'texto_biblico',
    question: 'Complete Oséias 7:9: estranhos devoram a força de Efraim "sem que ele o saiba" e…',
    option_a: 'os filhos o abandonaram', option_b: 'cabelos brancos se espalharam por ele', option_c: 'os celeiros se esvaziaram', option_d: 'os inimigos cercaram os muros',
    correct_answer: 'B',
    explanation:
      'Oséias 7:9: "Estranhos lhe devoram a força, e ele não o sabe; também cabelos brancos já se espalham por ele, e ele não o sabe." A decadência é imperceptível: Israel envelhecia espiritualmente sem perceber.',
    hint: 'É um sinal de velhice que ele nem percebia.',
  },
  {
    id: uuid('010000000308'), book_id: 'oseias', chapter: 9, difficulty: 'dificil', order_index: 43, source_type: 'historico',
    question: 'Em Oséias 9:9, a corrupção de Israel é comparada aos dias de…',
    option_a: 'Gibeá', option_b: 'Jericó', option_c: 'Ai', option_d: 'Hazor',
    correct_answer: 'A',
    explanation:
      'Oséias 9:9: "Aprofundaram-se na corrupção, como nos dias de Gibeá." Gibeá ficou marcada pelo crime brutal contra a concubina do levita (Juízes 19), que gerou guerra civil. Comparar Israel a Gibeá é dizer que o povo atingiu o fundo moral.',
    hint: 'É a cidade do crime narrado em Juízes 19.',
  },
  {
    id: uuid('010000000309'), book_id: 'oseias', chapter: 10, difficulty: 'dificil', order_index: 44, source_type: 'texto_biblico',
    question: 'Segundo Oséias 10:14, quem destruiu Bete-Arbel no dia da batalha?',
    option_a: 'Nabucodonosor', option_b: 'Salman', option_c: 'Sisaque', option_d: 'Tilgate-Pilneser',
    correct_answer: 'B',
    explanation:
      'Oséias 10:14: "Crescerá o tumulto entre o teu povo, e todas as tuas fortalezas serão destruídas, como Salman destruiu a Bete-Arbel no dia da batalha." Trata-se de uma destruição exemplar do passado, usada como aviso do que viria sobre Israel.',
    hint: 'O nome começa com "S" e aparece uma única vez em todo o livro.',
  },
  {
    id: uuid('010000000310'), book_id: 'oseias', chapter: 10, difficulty: 'dificil', order_index: 45, source_type: 'texto_biblico',
    question: 'Complete Oséias 10:8: "Dirão aos montes: Cobri-nos! E aos outeiros: ___!"',
    option_a: 'Escondei-nos', option_b: 'Caí sobre nós', option_c: 'Guardai-nos', option_d: 'Livrai-nos',
    correct_answer: 'B',
    explanation:
      'Oséias 10:8: "Dirão aos montes: Cobri-nos! E aos outeiros: Caí sobre nós!" No desespero do juízo, o povo preferiria ser soterrado a encarar a Deus. Jesus citou essas palavras a caminho da cruz (Lucas 23:30).',
    hint: 'Jesus repetiu esse clamor no caminho ao Calvário.',
  },
  {
    id: uuid('010000000311'), book_id: 'oseias', chapter: 12, difficulty: 'dificil', order_index: 46, source_type: 'texto_biblico',
    question: 'Complete Oséias 12:7: "É mercador; tem ___ enganosa em sua mão".',
    option_a: 'balança', option_b: 'espada', option_c: 'medida de trigo', option_d: 'moeda',
    correct_answer: 'A',
    explanation:
      'Oséias 12:7: "É mercador; tem balança enganosa em sua mão; ama a opressão." A desonestidade no comércio é denunciada como forma de opressão contra o próximo — tema comum também em Amós 8:5.',
    hint: 'É o instrumento do comércio desonesto.',
  },
  {
    id: uuid('010000000312'), book_id: 'oseias', chapter: 12, difficulty: 'dificil', order_index: 47, source_type: 'texto_biblico',
    question: 'Segundo Oséias 12:12, Jacó fugiu para o campo de…',
    option_a: 'Edom', option_b: 'Moabe', option_c: 'Arã (Síria)', option_d: 'Midian',
    correct_answer: 'C',
    explanation:
      'Oséias 12:12: "Jacó fugiu para o campo da Síria, e Israel serviu por mulher e por mulher guardou o rebanho." O profeta recorda que o patriarca começou como servo humilde — contraste com o orgulho dos descendentes enriquecidos.',
    hint: 'Foi para lá que ele foi trabalhar para Labão.',
  },
  {
    id: uuid('010000000313'), book_id: 'oseias', chapter: 12, difficulty: 'dificil', order_index: 48, source_type: 'texto_biblico',
    question: 'Complete Oséias 12:13: "Por um ___ o Senhor tirou a Israel do Egito".',
    option_a: 'exército', option_b: 'rei', option_c: 'profeta', option_d: 'sinal no céu',
    correct_answer: 'C',
    explanation:
      'Oséias 12:13: "Mas o Senhor, por meio de um profeta, fez subir a Israel do Egito, e, por um profeta, foi ele guardado." O profeta é Moisés: a libertação veio pela Palavra de Deus, não por força humana — e os profetas continuavam sendo os guardas de Israel.',
    hint: 'É o ministério de Moisés, que tirou o povo do Egito.',
  },
  {
    id: uuid('010000000314'), book_id: 'oseias', chapter: 13, difficulty: 'dificil', order_index: 49, source_type: 'texto_biblico',
    question: 'Complete Oséias 13:7: "Serei, pois, para eles como leão; como ___ espreitarei junto ao caminho".',
    option_a: 'leopardo', option_b: 'lobo', option_c: 'águia', option_d: 'serpente',
    correct_answer: 'A',
    explanation:
      'Oséias 13:7-8: "Serei, pois, para eles como leão; como leopardo espreitarei junto ao caminho. Como ursa roubada dos seus filhos, os encontrarei." Três predadores em sequência mostram a certeza do juízo sobre um povo que esqueceu a Deus (13:6).',
    hint: 'É um felino veloz, antes da ursa do versículo seguinte.',
  },
  {
    id: uuid('010000000315'), book_id: 'oseias', chapter: 14, difficulty: 'dificil', order_index: 50, source_type: 'texto_biblico',
    question: 'Complete Oséias 14:5: "Serei para Israel como ___; ele florescerá como o lírio".',
    option_a: 'o sol', option_b: 'a chuva temporã', option_c: 'o orvalho', option_d: 'o rio',
    correct_answer: 'C',
    explanation:
      'Oséias 14:5: "Serei para Israel como orvalho, ele florescerá como o lírio e lançará as suas raízes como o cedro do Líbano." O orvalho silencioso contrasta com a tempestade do juízo: a restauração viria suave, pela graça.',
    hint: 'É a umidade silenciosa que molha a relva de madrugada.',
  },
];

export default OSEIAS_QUESTIONS;
