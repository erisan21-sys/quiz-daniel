-- ============================================================================
--  QUIZ BÍBLICO — DANIEL · seed.sql
--  20 perguntas (6 fáceis · 8 médias · 6 difíceis) cobrindo Daniel 1–12
--  + 7 conquistas
-- ----------------------------------------------------------------------------
--  Idempotente: pode ser executado mais de uma vez sem duplicar dados.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- PERGUNTAS
-- ---------------------------------------------------------------------------
insert into public.questions
  (chapter, question, difficulty, option_a, option_b, option_c, option_d,
   correct_answer, explanation, hint, source_type, order_index)
values
-- ===== FÁCEIS (6) =====
(1, 'Em qual cidade Daniel vivia quando foi levado cativo para a Babilônia?',
 'facil', 'Nínive', 'Susa', 'Babilônia', 'Jerusalém', 'D',
 'Daniel 1:1-6 registra que no terceiro ano do reinado de Jeoaquim, rei de Judá, Nabucodonosor cercou Jerusalém e levou para a Babilônia jovens israelitas sem defeito físico, entre eles Daniel, Hananias, Misael e Azarias. Jerusalém era a capital de Judá.',
 'Era a capital do reino de Judá, onde ficava o templo.',
 'texto_biblico', 1),

(1, 'Qual nome babilônico foi dado a Daniel?',
 'facil', 'Beltessazar', 'Sadrac', 'Mesaque', 'Abede-Nego', 'A',
 'Daniel 1:7: "O chefe dos eunucos lhes pôs outros nomes: a Daniel, Beltessazar; a Hananias, Sadrac; a Misael, Mesaque; e a Azarias, Abede-Nego." Sadrac, Mesaque e Abede-Nego foram os nomes dados aos três amigos.',
 'Começa com "Bel", um elemento comum em nomes babilônicos ligados ao deus Bel.',
 'texto_biblico', 2),

(3, 'O que aconteceu com os três amigos de Daniel (Sadrac, Mesaque e Abede-Nego) na fornalha?',
 'facil',
 'Foram consumidos pelo fogo imediatamente',
 'Nebuzaradã os libertou antes do fogo',
 'Saíram ilesos, e o rei viu um quarto homem semelhante a um filho dos deuses',
 'O fogo se apagou quando Daniel orou', 'C',
 'Daniel 3:24-27: Nabucodonosor viu quatro homens soltos andando no meio do fogo, sem nenhum dano, e o aspecto do quarto era "semelhante a um filho dos deuses". Eles saíram sem que o fogo tivesse tocado seus corpos, e nem o cheiro de fogo passou sobre eles.',
 'O rei contou quatro pessoas, não três.',
 'texto_biblico', 3),

(5, 'O que foi escrito na parede durante o banquete do rei Belsazar?',
 'facil',
 'MENE, MENE, TEQUEL e PARSIM',
 'SANTO, SANTO, SANTO',
 'GLÓRIA A DEUS NAS ALTURAS',
 'EU SOU O QUE SOU', 'A',
 'Daniel 5:5, 25-28: apareceram dedos de mão humana escrevendo no reboco da parede: "MENE, MENE, TEQUEL, PARSIM". Daniel interpretou: MENE = Deus contou os dias do teu reino e deu fim a ele; TEQUEL = foste pesado na balança e achado em falta; PARSIM = o teu reino foi dividido e entregue aos medos e persas.',
 'São quatro palavras em aramaico, repetindo a primeira.',
 'texto_biblico', 4),

(6, 'Por que Daniel foi lançado na cova dos leões?',
 'facil',
 'Porque recusou a comida do rei',
 'Porque continuou orando a Deus três vezes ao dia, apesar do decreto real',
 'Porque interpretou mal um sonho',
 'Porque fugiu da Babilônia', 'B',
 'Daniel 6:10-16: um decreto assinado por Dario proibia, por trinta dias, qualquer petição a outro deus ou homem. Daniel, sabendo do decreto, entrou em casa e orou três vezes por dia, como era seu costume. Os acusadores o flagraram e o rei foi obrigado a lançá-lo na cova.',
 'A proibição durava trinta dias e valia para pedidos e orações.',
 'texto_biblico', 5),

(7, 'Quantos capítulos tem o livro de Daniel?',
 'facil', '10', '11', '12', '14', 'C',
 'O livro de Daniel possui 12 capítulos: os capítulos 1 a 6 trazem narrativas históricas (Babilônia e Média-Pérsia) e os capítulos 7 a 12 trazem as visões apocalípticas. Nota histórica: as versões gregas (Septuaginta/Vulgata) acrescentam os capítulos 13 e 14 (Susana e Bel e o Dragão), que não fazem parte do cânon hebraico/protestante.',
 'O último capítulo fala dos 1.290 e 1.335 dias.',
 'texto_biblico', 6),

-- ===== MÉDIAS (8) =====
(1, 'Qual foi a decisão de Daniel em relação às finas iguarias e ao vinho do rei?',
 'medio',
 'Aceitou tudo para não chamar atenção',
 'Pediu para ser dispensado do serviço do rei',
 'Propôs uma experiência de dez dias com legumes e água',
 'Ofereceu a comida aos outros jovens', 'C',
 'Daniel 1:12: "Experimenta, peço-te, os teus servos dez dias; e que se nos deem legumes a comer e água a beber." Ao fim dos dez dias, a aparência deles era melhor e mais robusta do que a de todos os jovens que comiam das iguarias do rei.',
 'Foi um teste com prazo definido: dez dias.',
 'texto_biblico', 7),

(2, 'No sonho de Nabucodonosor, qual material formava a cabeça da grande estátua?',
 'medio', 'Prata', 'Bronze', 'Ferro', 'Ouro', 'D',
 'Daniel 2:32-33: a cabeça era de ouro fino; o peito e os braços, de prata; o ventre e os coxas, de bronze; as pernas, de ferro; os pés, em parte de ferro e em parte de barro. Daniel identifica explicitamente a cabeça de ouro com o próprio Nabucodonosor (v. 38).',
 'É o metal mais nobre e representa o próprio Nabucodonosor.',
 'texto_biblico', 8),

(3, 'Quais eram os nomes hebraicos dos três amigos de Daniel?',
 'medio',
 'Hananias, Misael e Azarias',
 'Ezequiel, Jeremias e Isaías',
 'Sadrac, Mesaque e Abede-Nego',
 'Elias, Eliseu e Natã', 'A',
 'Daniel 1:6-7: os jovens de Judá eram Daniel, Hananias, Misael e Azarias. Sadrac, Mesaque e Abede-Nego são os nomes babilônicos que receberam do chefe dos eunucos.',
 'Sadrac, Mesaque e Abede-Nego são os nomes babilônicos; a pergunta pede os hebraicos.',
 'texto_biblico', 9),

(4, 'Qual era a altura da estátua de ouro que Nabucodonosor levantou no campo de Dura?',
 'medio', 'Trinta côvados', 'Sessenta côvados', 'Noventa côvados', 'Cento e vinte côvados', 'B',
 'Daniel 3:1: "O rei Nabucodonosor fez uma estátua de ouro, cuja altura era de sessenta côvados, e a sua largura, de seis côvados; levantou-a no campo de Dura, na província de Babilônia." Sessenta côvados equivalem a aproximadamente 27 metros.',
 'É um número redondo, seis vezes dez.',
 'texto_biblico', 10),

(4, 'Qual foi a resposta dos três jovens ao serem ameaçados de morte na fornalha?',
 'medio',
 'Pediram que Daniel intercedesse por eles',
 'Disseram que o seu Deus podia livrá-los e que, mesmo que não livrasse, não serviriam aos deuses do rei',
 'Concordaram em se curvar apenas uma vez',
 'Fugiram para o deserto', 'B',
 'Daniel 3:17-18: "Se o nosso Deus, a quem servimos, quer livrar-nos, ele nos livrará da fornalha de fogo ardente e da tua mão, ó rei. Se não, fica sabendo, ó rei, que não serviremos a teus deuses, nem adoraremos a estátua de ouro que levantaste."',
 'A resposta termina com um "se não" — a fidelidade não dependia do livramento.',
 'texto_biblico', 11),

(4, 'O sonho da grande árvore que foi cortada, no capítulo 4, referia-se a quem?',
 'medio',
 'Ao próprio Nabucodonosor',
 'A Belsazar',
 'A Dario, o medo',
 'A Ciro, rei da Pérsia', 'A',
 'Daniel 4:20-26: a árvore alta e forte que alcançava o céu e foi mandada cortar, deixando apenas o toco com laços de ferro e bronze, representa Nabucodonosor. Ele seria expulso do meio dos homens e viveria com os animais do campo por "sete tempos", até reconhecer que o Altíssimo tem domínio sobre o reino dos homens.',
 'O próprio rei teve o sonho — e era sobre ele mesmo.',
 'texto_biblico', 12),

(5, 'Qual rei reinava em Babilônia quando a escrita apareceu na parede?',
 'medio', 'Nabucodonosor', 'Belsazar', 'Dario', 'Ciro', 'B',
 'Daniel 5:1-5: Belsazar deu um grande banquete a mil dos seus grandes. No meio da festa, mandou trazer os utensílios de ouro e prata que Nabucodonosor tirara do templo de Jerusalém, e foi então que apareceram os dedos de uma mão escrevendo na parede. Naquela mesma noite Belsazar foi morto e Dario, o medo, recebeu o reino (5:30-31).',
 'Ele era filho/descendente de Nabucodonosor e morreu naquela mesma noite.',
 'texto_biblico', 13),

(7, 'Na visão de Daniel 7, o segundo animal, semelhante a um urso, tinha o quê na boca?',
 'medio', 'Uma espada de bronze', 'Um cetro de ferro', 'Três costelas', 'Sete coroas', 'C',
 'Daniel 7:5: "Continuei olhando, e eis aqui o segundo animal, semelhante a um urso, o qual se levantou de um lado, tendo na boca três costelas entre os dentes; e lhe foi dito: Levanta-te, devora muita carne."',
 'É um número pequeno, entre três e quatro.',
 'texto_biblico', 14),

-- ===== DIFÍCEIS (6) =====
(7, 'Como Daniel descreve o quarto animal da visão do capítulo 7?',
 'dificil',
 'Semelhante a um leopardo com quatro asas',
 'Terrível, espantoso e muito forte, com grandes dentes de ferro e dez chifres',
 'Semelhante a um leão com asas de águia',
 'Semelhante a um urso levantado de um lado', 'B',
 'Daniel 7:7: o quarto animal era "terrível, espantoso e sobremodo forte", com enormes dentes de ferro, que devorava, fazia em pedaços e pisava aos pés o que sobrava; era diferente de todos os animais anteriores e tinha dez chifres. O leão com asas de águia é o primeiro animal (v.4), o urso é o segundo (v.5) e o leopardo de quatro cabeças é o terceiro (v.6).',
 'Não se parece com nenhum animal conhecido — por isso Daniel não lhe dá nome.',
 'texto_biblico', 15),

(8, 'Na visão de Daniel 8, o que o carneiro com dois chifres representa, segundo a explicação do próprio texto?',
 'dificil',
 'Os reis da Grécia',
 'O reino de Roma',
 'Os reis da Média e da Pérsia',
 'Os reinos de Israel e Judá', 'C',
 'Daniel 8:20: "O carneiro com dois chifres, que viste, são os reis da Média e da Pérsia." O versículo 21 completa: "Mas o bode peludo é o rei da Grécia; o chifre grande entre os olhos é o primeiro rei." Essa é uma identificação dada pelo próprio texto bíblico, através do anjo Gabriel.',
 'O bode peludo é a Grécia — o carneiro vem antes dele.',
 'texto_biblico', 16),

(9, 'A profecia das setenta semanas (Daniel 9:24-27) foi dada em resposta a quê?',
 'dificil',
 'À leitura que Daniel fez do livro de Jeremias sobre os setenta anos de cativeiro',
 'À visão dos quatro animais do capítulo 7',
 'À queda de Babilônia nas mãos de Dario',
 'Ao sonho da estátua de Nabucodonosor', 'A',
 'Daniel 9:2-3: "No primeiro ano do seu reinado, eu, Daniel, entendi, pelos livros, que o número de anos, de que falara o Senhor ao profeta Jeremias, que haviam de durar as assolações de Jerusalém, era de setenta anos. Voltei o rosto ao Senhor Deus, para o buscar com oração e súplicas, com jejum, pano de saco e cinza." A resposta veio pelo anjo Gabriel (9:21-27). Interpretação: o sentido das setenta semanas (e do que ocorre na septuagésima semana) é objeto de diferentes leituras teológicas — dispensacionalista, messiânica, preterista e histórico-crítica. O dado textual objetivo é apenas este: a profecia nasce da leitura de Jeremias.',
 'Jeremias falou de setenta anos, não de setenta semanas.',
 'texto_biblico', 17),

(10, 'Quanto tempo Daniel ficou jejuando antes da visão do capítulo 10, e quem o impediu por vinte e um dias?',
 'dificil',
 'Sete dias, impedido pelo príncipe da Babilônia',
 'Três semanas (vinte e um dias), impedido pelo príncipe do reino da Pérsia, até que Miguel veio ajudá-lo',
 'Quarenta dias, impedido por Satanás',
 'Dez dias, impedido pelo rei Ciro', 'B',
 'Daniel 10:2-3 e 10:12-13: Daniel esteve três semanas inteiras sem comer manjar desejável, carne nem vinho. O mensageiro diz: "Não temas, Daniel, porque desde o primeiro dia... as tuas palavras foram ouvidas... mas o príncipe do reino da Pérsia me resistiu por vinte e um dias; eis que Miguel, um dos primeiros príncipes, veio para ajudar-me."',
 'O jejum durou o mesmo número de dias que a resistência do príncipe da Pérsia.',
 'texto_biblico', 18),

(11, 'Sobre o "rei poderoso" de Daniel 11:3-4, o que o texto afirma?',
 'dificil',
 'Seu reino passaria intacto aos seus descendentes por quatro gerações',
 'Ele reinaria por setenta anos e morreria em Babilônia',
 'Seu domínio seria repartido para os quatro ventos do céu, mas não para a sua posteridade, nem segundo o poder com que reinou',
 'Ele seria morto por um dos seus generais dentro do templo', 'C',
 'Daniel 11:3-4: "Levantar-se-á um rei poderoso, que reinará com grande domínio e fará o que lhe aprouver. Mas, no auge, o seu reino será quebrado e repartido para os quatro ventos do céu; mas não para a sua posteridade, nem segundo o poder com que reinou, porque o seu reino será arrancado e passará a outros, fora de seus descendentes." Consenso histórico: a descrição corresponde a Alexandre, o Grande, cujo império foi dividido entre quatro generais (Ptolomeu, Seleuco, Cassandro e Lisímaco) — não entre seus filhos.',
 'O reino seria dividido em quatro partes e ficaria fora da família dele.',
 'historico', 19),

(12, 'O que Daniel 12:11-12 afirma sobre os 1.290 e os 1.335 dias?',
 'dificil',
 'São os dias de vida de Nabucodonosor',
 'Da abominação desoladora até o fim há 1.290 dias, e bem-aventurado o que espera e chega aos 1.335 dias',
 'São os dias do cativeiro babilônico, somando 2.625',
 'Representam os anos do reinado de Ciro', 'B',
 'Daniel 12:11-12: "Desde o tempo em que o sacrifício diário for tirado e posta a abominação desoladora, haverá mil duzentos e noventa dias. Bem-aventurado o que espera e chega até mil trezentos e trinta e cinco dias." Interpretação: o cumprimento desses números é objeto de diferentes leituras teológicas (histórica/antíoco Epifânio, escatológica/futurista, simbólica/idealista). O texto em si apenas enuncia os dois números e a bem-aventurança final, sem explicar a diferença de quarenta e cinco dias entre eles.',
 'Um número termina a contagem; o outro traz uma bem-aventurança.',
 'interpretacao', 20)

on conflict do nothing;

-- ---------------------------------------------------------------------------
-- CONQUISTAS
-- ---------------------------------------------------------------------------
insert into public.achievements (code, name, description, icon, criteria) values
 ('FIRST_GAME',     'Primeira Partida',      'Complete a sua primeira partida no Quiz de Daniel.',              '🎯',
   '{"type":"attempts_count","value":1}'::jsonb),
 ('FIVE_GAMES',     '5 Partidas',            'Complete 5 partidas.',                                            '🔥',
   '{"type":"attempts_count","value":5}'::jsonb),
 ('TEN_GAMES',      '10 Partidas',           'Complete 10 partidas.',                                           '⚡',
   '{"type":"attempts_count","value":10}'::jsonb),
 ('PERFECT_SCORE',  '100% de Acertos',       'Termine uma partida com todas as respostas corretas.',            '💯',
   '{"type":"perfect_attempt","value":true}'::jsonb),
 ('TOP_TEN',        'Top 10',                'Entre no top 10 do ranking geral.',                               '🏅',
   '{"type":"leaderboard_position","value":10}'::jsonb),
 ('FIRST_PLACE',    '1º Lugar',              'Alcance o 1º lugar do ranking geral.',                            '👑',
   '{"type":"leaderboard_position","value":1}'::jsonb),
 ('DANIEL_EXPERT',  'Especialista em Daniel','Acumule 100 respostas corretas e alcance 85% ou mais de acerto.',  '📖',
   '{"type":"expert","correct":100,"min_accuracy":85}'::jsonb)
on conflict (code) do nothing;
