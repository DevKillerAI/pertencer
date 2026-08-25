/**
 * Glossário Jurídico das Classificações do POME
 * Baseado no documento oficial "Glossário Jurídico das Classificações do POME - FINAL"
 * Secretaria Municipal de Educação de Contagem (Seduc)
 */

export const DIMENSIONS_INFO = {
  '1. Comportamentos e situações típicas da primeira infância': {
    id: 'dim1',
    numero: 1,
    nome: 'Comportamentos e situações típicas da primeira infância',
    descricao: 'Reúne comportamentos e situações típicas da primeira infância, observados geralmente nas CEMEIs, que fazem parte do desenvolvimento normal da criança e não configuram violência ou infração disciplinar. Crianças nessa faixa etária são absolutamente inimputáveis (ECA, art. 104, que exige idade mínima de 12 anos para ato infracional), e reações como mordida, birra ou disputa por brinquedo expressam dificuldades típicas de autorregulação emocional e comunicação, não intenção de causar dano.',
    orientacaoPedagogica: 'Cabe à escola observar padrões, acolher a criança e a família, e ajustar rotina e ambiente de forma preventiva — nunca aplicar aqui a lógica disciplinar ou o vocabulário reservado a estudantes mais velhos.',
    cor: '#0ea5e9', // Sky blue
    icone: '👶'
  },
  '2. Reclamações pedagógicas e institucionais': {
    id: 'dim2',
    numero: 2,
    nome: 'Reclamações pedagógicas e institucionais',
    descricao: 'Reúne manifestações de estudantes e famílias sobre a qualidade do ensino ou da estrutura oferecida, que não envolvem violência mas impactam diretamente o clima escolar e a confiança na instituição.',
    orientacaoPedagogica: 'Acolher e encaminhar cedo evita que uma insatisfação legítima se transforme, com o tempo, em conflito mais grave.',
    cor: '#059669', // Emerald
    icone: '📋'
  },
  '3. Descumprimento de normas escolares': {
    id: 'dim3',
    numero: 3,
    nome: 'Descumprimento de normas escolares',
    descricao: 'Reúne condutas de natureza disciplinar e administrativa, tratadas pelo regimento escolar e pela gestão pedagógica, sem correspondência penal.',
    orientacaoPedagogica: 'São o primeiro nível de resposta da escola diante de comportamentos que afetam a rotina e a convivência, resolvidas com medidas pedagógicas internas — a menos que se tornem recorrentes ou sinalizem uma dificuldade maior (familiar, emocional, de aprendizagem) que mereça investigação mais atenta.',
    cor: '#d97706', // Amber
    icone: '⚠️'
  },
  '4. Patrimônio escolar': {
    id: 'dim4',
    numero: 4,
    nome: 'Patrimônio escolar',
    descricao: 'Reúne condutas contra bens materiais da escola ou de membros da comunidade escolar. Embora tenham menor impacto direto sobre a integridade das pessoas, afetam o senso de segurança e de pertencimento ao espaço escolar.',
    orientacaoPedagogica: 'Sua reincidência por parte de um mesmo estudante pode sinalizar dificuldade socioemocional que merece acompanhamento, não apenas reparação do dano.',
    cor: '#6366f1', // Indigo
    icone: '🏫'
  },
  '5. Discriminação e preconceito': {
    id: 'dim5',
    numero: 5,
    nome: 'Discriminação e preconceito',
    descricao: 'Reúne condutas que atingem a dignidade de um estudante ou grupo em razão de características pessoais — raça, gênero, orientação sexual, religião, deficiência, classe social, origem, entre outras.',
    orientacaoPedagogica: 'Pedagogicamente, exigem resposta que vá além da punição individual: acolhimento da vítima, trabalho de sensibilização com a turma e fortalecimento de uma cultura de respeito, além do encaminhamento formal quando a conduta configurar crime. A discriminação tende a se repetir quando não é nomeada e enfrentada.',
    cor: '#ec4899', // Pink
    icone: '🤝'
  },
  '6. Violências interpessoais': {
    id: 'dim6',
    numero: 6,
    nome: 'Violências interpessoais',
    descricao: 'Reúne situações em que um membro da comunidade escolar causa dano físico, verbal ou moral a outro, de forma direta e identificável.',
    orientacaoPedagogica: 'Pedagogicamente, pedem intervenção imediata para garantir segurança e acolhimento das partes envolvidas, mediação do conflito e, quando cabível, encaminhamento à rede de proteção. O registro do termo específico permite dimensionar a resposta adequada.',
    cor: '#ef4444', // Red
    icone: '⚡'
  },
  '7. Situações de risco à vida, à saúde e à segurança': {
    id: 'dim7',
    numero: 7,
    nome: 'Situações de risco à vida, à saúde e à segurança',
    descricao: 'Reúne condutas ou omissões — muitas vezes fora do controle direto do estudante — que colocam em risco sua integridade física, sua saúde ou seu desenvolvimento.',
    orientacaoPedagogica: 'Aqui o estudante costuma ser vítima de uma circunstância (negligência familiar, ausência de cuidado, exposição a arma) e não autor de uma infração; a resposta da escola deve priorizar a articulação com a rede de proteção (Conselho Tutelar, saúde, assistência social).',
    cor: '#8b5cf6', // Violet
    icone: '🚨'
  },
  '8. Violência sexual': {
    id: 'dim8',
    numero: 8,
    nome: 'Violência sexual',
    descricao: 'Reúne condutas que violam a dignidade sexual de um estudante, identificadas ou reveladas no ambiente escolar.',
    orientacaoPedagogica: 'É a dimensão que exige o protocolo mais rígido de atuação: cabe à escola acolher quem relata, sem investigar ou julgar o caso, e comunicar imediata e obrigatoriamente o Conselho Tutelar e, quando necessário, a autoridade policial.',
    cor: '#991b1b', // Dark red
    icone: '🛑'
  }
};

export const LEGAL_GLOSSARY = {
  // 1. Comportamentos e situações típicas da primeira infância
  'Mordida entre crianças': {
    termo: 'Mordida entre crianças',
    dimensao: '1. Comportamentos e situações típicas da primeira infância',
    significado: 'Não é figura jurídico-penal nem ato infracional — crianças na primeira infância são absolutamente inimputáveis (ECA, art. 104). Segundo as Diretrizes Curriculares Nacionais para a Educação Infantil (Resolução CNE/CEB nº 5/2009), o desenvolvimento da criança pequena envolve fases de comunicação pré-verbal e dificuldade de autorregulação emocional, das quais a mordida é manifestação típica.',
    termoAdequado: 'Registrar como "mordida entre crianças", nunca como "agressão física" — o enquadramento penal e a lógica de responsabilização não se aplicam a essa faixa etária.',
    situacaoEscola: 'Episódios de mordida entre crianças da educação infantil, geralmente associados a frustração, disputa por objeto/atenção ou dificuldade de comunicação verbal.',
    encaminhamentoPedagogico: 'Acolhimento das crianças envolvidas, comunicação aos responsáveis de ambas as partes, observação de padrões (frequência, gatilhos) e articulação com a coordenação pedagógica.',
    fonteLegal: 'Estatuto da Criança e do Adolescente (Lei 8.069/1990), art. 104; Resolução CNE/CEB nº 5/2009 (DCNEI); LDB, arts. 29 a 31.'
  },
  'Disputa por objetos/brinquedos': {
    termo: 'Disputa por objetos/brinquedos',
    dimensao: '1. Comportamentos e situações típicas da primeira infância',
    significado: 'Manifestação típica do desenvolvimento da noção de posse e compartilhamento nos primeiros anos; parte do processo de socialização previsto na BNCC para a Educação Infantil e nas DCNEI, com interações e brincadeiras como eixos estruturantes.',
    termoAdequado: 'Registrar como "disputa por objetos/brinquedos"; não se enquadra como conflito disciplinar nem como ocorrência de violência.',
    situacaoEscola: 'Crianças disputando o mesmo brinquedo ou objeto, por vezes com empurrões leves decorrentes da disputa.',
    encaminhamentoPedagogico: 'Mediação simples pelo educador no momento do episódio e incentivo a rotinas de compartilhamento/revezamento.',
    fonteLegal: 'BNCC — Educação Infantil; Resolução CNE/CEB nº 5/2009 (DCNEI).'
  },
  'Agressividade física entre crianças pequenas': {
    termo: 'Agressividade física entre crianças pequenas',
    dimensao: '1. Comportamentos e situações típicas da primeira infância',
    significado: 'Não é figura jurídico-penal nem ato infracional (ECA, art. 104); é manifestação de dificuldade de autorregulação emocional e de comunicação não verbal típica da primeira infância, distinta da "agressão física" entre estudantes maiores.',
    termoAdequado: 'Registrar como "agressividade física entre crianças pequenas", distinta de "agressão física" (reservada a estudantes com maior maturidade e intencionalidade).',
    situacaoEscola: 'Empurrar, bater, puxar cabelo ou beliscar entre crianças da educação infantil.',
    encaminhamentoPedagogico: 'Intervenção imediata do educador para garantir a segurança de todos, acolhimento das crianças envolvidas, comunicação aos responsáveis e observação de padrões.',
    fonteLegal: 'Estatuto da Criança e do Adolescente, art. 104; Resolução CNE/CEB nº 5/2009 (DCNEI); LDB, arts. 29 a 31.'
  },
  'Dificuldade de adaptação / choro persistente': {
    termo: 'Dificuldade de adaptação / choro persistente',
    dimensao: '1. Comportamentos e situações típicas da primeira infância',
    significado: 'Fenômeno esperado no período de adaptação à rotina escolar, decorrente do processo de separação da figura de apego primário.',
    termoAdequado: 'Registrar como "dificuldade de adaptação/choro persistente", sem caráter disciplinar.',
    situacaoEscola: 'Choro frequente ou prolongado, recusa em entrar na sala, resistência à separação dos responsáveis — sobretudo no início do ano letivo ou logo após a matrícula.',
    encaminhamentoPedagogico: 'Acolhimento gradual, diálogo com a família sobre estratégias de adaptação e acompanhamento pedagógico.',
    fonteLegal: 'Resolução CNE/CEB nº 5/2009 (DCNEI); LDB, arts. 29 a 31.'
  },
  'Birra / crise comportamental': {
    termo: 'Birra / crise comportamental',
    dimensao: '1. Comportamentos e situações típicas da primeira infância',
    significado: 'Episódio de descontrole emocional típico da primeira infância, associado à imaturidade do desenvolvimento da autorregulação emocional; não configura indisciplina no sentido disciplinar.',
    termoAdequado: 'Registrar como "birra/crise comportamental", distinta de "indisciplina recorrente".',
    situacaoEscola: 'Choro intenso, gritos, recusa em seguir orientações, episódios de descontrole emocional.',
    encaminhamentoPedagogico: 'Acolhimento sem punição, manutenção da rotina e dos limites com calma, observação de gatilhos e contexto.',
    fonteLegal: 'Resolução CNE/CEB nº 5/2009 (DCNEI).'
  },
  'Regressão comportamental': {
    termo: 'Regressão comportamental',
    dimensao: '1. Comportamentos e situações típicas da primeira infância',
    significado: 'Retorno a comportamentos de fase anterior do desenvolvimento (voltar a usar fralda, chupeta, fala infantilizada), frequentemente associado a mudanças familiares, nascimento de irmão, mudanças na rotina ou estresse emocional; não é ocorrência disciplinar, mas sinal de atenção.',
    termoAdequado: 'Registrar como "regressão comportamental"; não se aplica lógica disciplinar.',
    situacaoEscola: 'Criança volta a apresentar comportamentos típicos de uma fase anterior do desenvolvimento.',
    encaminhamentoPedagogico: 'Observação e registro do padrão, diálogo com a família sobre possíveis fatores associados e apoio pedagógico.',
    fonteLegal: 'Resolução CNE/CEB nº 5/2009 (DCNEI); ECA, art. 1º (princípio da proteção integral).'
  },
  'Recusa alimentar / seletividade alimentar': {
    termo: 'Recusa alimentar / seletividade alimentar',
    dimensao: '1. Comportamentos e situações típicas da primeira infância',
    significado: 'Comportamento comum na primeira infância, relacionado ao desenvolvimento do paladar e da autonomia alimentar; distingue-se de questões estruturais do serviço de alimentação escolar.',
    termoAdequado: 'Registrar como "recusa alimentar/seletividade alimentar".',
    situacaoEscola: 'Criança recusa determinados alimentos, apresenta seletividade alimentar acentuada ou recusa se alimentar na escola.',
    encaminhamentoPedagogico: 'Registro do padrão alimentar, diálogo com a família sobre os hábitos em casa, oferta gradual e sem pressão dos alimentos recusados.',
    fonteLegal: 'Resolução CNE/CEB nº 5/2009 (DCNEI).'
  },

  // 2. Reclamações pedagógicas e institucionais
  'Reclamação pedagógica': {
    termo: 'Reclamação pedagógica',
    dimensao: '2. Reclamações pedagógicas e institucionais',
    significado: 'Exercício de um direito do estudante e da família. O ECA assegura o direito de ser respeitado por seus educadores e contestar critérios avaliativos (art. 53, II e III). A LDB estabelece a garantia de padrão de qualidade (art. 3º, IX).',
    termoAdequado: 'Registrar como "reclamação pedagógica" (ou atuação docente), com foco na qualidade do processo de ensino-aprendizagem, sem configurar conduta agressiva ou disciplinar.',
    situacaoEscola: 'Relatos de que as aulas não estão ocorrendo de forma efetiva, metodologia inadequada ou faltas frequentes sem reposição.',
    fonteLegal: 'Estatuto da Criança e do Adolescente (Lei 8.069/1990), art. 53; LDB (Lei 9.394/1996), arts. 3º, 12 e 13.'
  },
  'Reclamação institucional / administrativa': {
    termo: 'Reclamação institucional / administrativa',
    dimensao: '2. Reclamações pedagógicas e institucionais',
    significado: 'Relaciona-se ao direito a padrões básicos de qualidade na prestação do serviço educacional (CF, art. 206, VII), alimentação escolar (PNAE, Lei 11.947/2009) e acessibilidade (Lei 13.146/2015).',
    termoAdequado: 'Registrar como "reclamação institucional/administrativa", reunindo questões de infraestrutura, alimentação escolar e funcionamento da unidade.',
    situacaoEscola: 'Problemas estruturais (banheiros, bebedouros, acessibilidade), falhas na merenda escolar ou desorganização de horários/comunicação.',
    fonteLegal: 'Constituição Federal, art. 206, VII; Lei 11.947/2009 (PNAE); Lei 13.146/2015; ECA, art. 53, V.'
  },

  // 3. Descumprimento de normas escolares
  'Indisciplina recorrente': {
    termo: 'Indisciplina recorrente',
    dimensao: '3. Descumprimento de normas escolares',
    significado: 'Não é figura jurídico-penal. É conceito pedagógico-administrativo regido pelo regimento escolar e pelas diretrizes gerais da educação (LDB).',
    termoAdequado: 'Manter "indisciplina recorrente" como categoria disciplinar/pedagógica, distinta de categorias de natureza penal.',
    situacaoEscola: 'Descumprimento repetido de regras internas (não seguir orientações, desrespeitar horários, desobedecer instruções).',
    fonteLegal: 'Lei 9.394/1996 (LDB); Regimento Escolar da unidade de ensino.'
  },
  'Saída injustificada da sala': {
    termo: 'Saída injustificada da sala',
    dimensao: '3. Descumprimento de normas escolares',
    significado: 'Infração ao regimento escolar, relacionada ao dever da escola de zelar pela frequência e segurança do estudante durante o período letivo (ECA, arts. 53 e 56).',
    termoAdequado: 'Manter o termo; tecnicamente é infração regimental ao dever de permanência/frequência.',
    situacaoEscola: 'Estudante que sai da sala de aula sem autorização do professor ou responsável.',
    fonteLegal: 'Estatuto da Criança e do Adolescente (Lei 8.069/1990), arts. 53 e 56; Regimento Escolar.'
  },
  'Uso indevido de aparelhos eletrônicos': {
    termo: 'Uso indevido de aparelhos eletrônicos',
    dimensao: '3. Descumprimento de normas escolares',
    significado: 'A Lei Federal nº 15.100/2025 restringe o uso de aparelhos eletrônicos portáteis pessoais (celulares, tablets) por estudantes da educação básica durante todo o período escolar, inclusive intervalos, salvo finalidade pedagógica autorizada, emergência ou necessidade de saúde.',
    termoAdequado: 'Manter o termo; fundamentado na Lei Federal nº 15.100/2025.',
    situacaoEscola: 'Uso de celular ou outro dispositivo eletrônico durante aula ou intervalo fora das exceções permitidas.',
    fonteLegal: 'Lei Federal nº 15.100/2025; Diretrizes da Rede Municipal de Ensino.'
  },
  'Transgressão': {
    termo: 'Transgressão',
    dimensao: '3. Descumprimento de normas escolares',
    significado: 'Conceito pedagógico-administrativo mais amplo que "indisciplina", usado para descrever o descumprimento de regras, normas ou combinados coletivos da instituição.',
    termoAdequado: 'Manter "transgressão" para descumprimentos de regras gerais do regimento não cobertos pelos demais termos.',
    situacaoEscola: 'Descumprimento de regras do regimento — por exemplo, uso indevido de espaços da escola, quebra de combinados coletivos.',
    fonteLegal: 'Lei 9.394/1996 (LDB); Regimento Escolar da unidade de ensino.'
  },
  'Incivilidade': {
    termo: 'Incivilidade',
    dimensao: '3. Descumprimento de normas escolares',
    significado: 'Comportamentos pontuais de desrespeito às normas básicas de convívio coletivo e cortesia, sem configurar necessariamente descumprimento de regra específica ou reiteração.',
    termoAdequado: 'Manter "incivilidade" como categoria pedagógica mais leve; se o comportamento se tornar frequente, reclassificar como "indisciplina recorrente".',
    situacaoEscola: 'Não respeitar fila, falar sem pedir a vez, não dividir espaço, barulho excessivo, desorganização de espaços comuns.',
    fonteLegal: 'Lei 9.394/1996 (LDB); Regimento Escolar.'
  },
  'Atraso recorrente': {
    termo: 'Atraso recorrente',
    dimensao: '3. Descumprimento de normas escolares',
    significado: 'Reiteração de chegadas atrasadas ao horário letivo. Distingue-se de evasão porque o estudante comparece. Se reiterado sem justificativa, pode indicar negligência familiar (ECA, art. 56).',
    termoAdequado: 'Manter "atraso recorrente" como categoria própria, tratada prioritariamente por medidas pedagógicas e diálogo com responsáveis.',
    situacaoEscola: 'Estudante que chega atrasado à escola ou às aulas de forma repetida, comprometendo o acompanhamento pedagógico.',
    fonteLegal: 'Lei 9.394/1996 (LDB); Regimento Escolar; ECA, art. 56.'
  },
  'Fraude em avaliação (cola)': {
    termo: 'Fraude em avaliação (cola)',
    dimensao: '3. Descumprimento de normas escolares',
    significado: 'Infração de natureza pedagógico-disciplinar regida pelo regimento escolar (anulação da prova, refazimento ou orientação disciplinar). Não se confunde com falsificação de documentos públicos.',
    termoAdequado: 'Manter "fraude em avaliação (cola)" como categoria pedagógico-disciplinar.',
    situacaoEscola: 'Uso de cola, consulta não autorizada ou comunicação indevida durante avaliações.',
    fonteLegal: 'Lei 9.394/1996 (LDB); Regimento Escolar.'
  },

  // 4. Patrimônio escolar
  'Furto': {
    termo: 'Furto',
    dimensao: '4. Patrimônio escolar',
    significado: 'Subtrair, para si ou para outrem, coisa alheia móvel, SEM violência ou grave ameaça à pessoa (Código Penal, art. 155).',
    termoAdequado: '"Furto" é o termo correto.',
    situacaoEscola: 'Pegar pertences de colega ou da escola sem que a vítima perceba, sem confronto direto ou ameaça.',
    fonteLegal: 'Código Penal, art. 155; ECA, art. 103 (ato infracional).'
  },
  'Roubo': {
    termo: 'Roubo',
    dimensao: '4. Patrimônio escolar',
    significado: 'Subtrair coisa alheia móvel mediante violência ou grave ameaça à pessoa, ou reduzindo-a à impossibilidade de resistência (Código Penal, art. 157). Atinge simultaneamente patrimônio e integridade física.',
    termoAdequado: 'Manter "roubo" como termo próprio, distinto de "furto", dado o emprego de violência ou ameaça.',
    situacaoEscola: 'Subtrair bens mediante ameaça, força física ou uso de objeto intimidatório.',
    fonteLegal: 'Código Penal, art. 157; ECA, art. 103.'
  },
  'Dano ao patrimônio': {
    termo: 'Dano ao patrimônio',
    dimensao: '4. Patrimônio escolar',
    significado: 'Destruir, inutilizar ou deteriorar coisa alheia ou patrimônio público escolar (Código Penal, art. 163).',
    termoAdequado: '"Dano ao patrimônio" é o termo técnico-jurídico; "depredação" é sinônimo de uso corrente no registro pedagógico.',
    situacaoEscola: 'Quebrar carteiras ou equipamentos, pichar paredes, danificar materiais escolares ou pertences de outrem.',
    fonteLegal: 'Código Penal, art. 163 (dano ao patrimônio público); ECA, art. 103.'
  },

  // 5. Discriminação e preconceito
  'Racismo': {
    termo: 'Racismo',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Crime resultante de discriminação ou preconceito de raça, cor, etnia, religião ou procedência nacional, dirigido a uma coletividade (Lei 7.716/1989, alterada pela Lei 14.532/2023). Inafiançável e imprescritível (CF, art. 5º, XLII).',
    termoAdequado: '"Racismo" está correto.',
    situacaoEscola: 'Recusa de convívio, segregação ou ofensas coletivas dirigidas a grupo racial ou étnico dentro da escola.',
    fonteLegal: 'Lei 7.716/1989 (alterada pela Lei 14.532/2023); Constituição Federal, art. 5º, XLII.'
  },
  'Injúria racial': {
    termo: 'Injúria racial',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Ofensa à dignidade de pessoa determinada com base em raça, cor, etnia ou procedência nacional. Integra a Lei de Racismo (art. 2º-A da Lei 7.716/1989), sendo inafiançável e imprescritível.',
    termoAdequado: 'Quando a ofensa por raça/cor/etnia é dirigida a uma pessoa específica, o enquadramento é "injúria racial", equiparada ao racismo.',
    situacaoEscola: 'Xingamento ou apelido pejorativo dirigido a um estudante específico com base em sua raça, cor, etnia ou origem.',
    fonteLegal: 'Lei 7.716/1989, art. 2º-A (incluído pela Lei 14.532/2023).'
  },
  'Discriminação por orientação sexual': {
    termo: 'Discriminação por orientação sexual',
    dimensao: '5. Discriminação e preconceito',
    significado: 'O STF (ADO 26/2019) determinou que homofobia e transfobia sejam enquadradas nos tipos penais da Lei 7.716/1989 (Lei do Racismo) por equiparação.',
    termoAdequado: 'LGBTfobia / Homofobia / Transfobia. Tecnicamente: "discriminação por orientação sexual ou identidade de gênero" (Lei 7.716/1989).',
    situacaoEscola: 'Exclusão, apelidos, humilhação ou agressão em razão de orientação sexual ou identidade de gênero; desrespeito ao nome social.',
    fonteLegal: 'STF, ADO 26 (2019); Lei 7.716/1989 (aplicação por equiparação).'
  },
  'Gordofobia': {
    termo: 'Gordofobia',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Quando dirigida a uma pessoa determinada, a ofensa por peso corporal configura injúria (Código Penal, art. 140) ou dano moral.',
    termoAdequado: 'Manter "gordofobia" como termo descritivo da conduta; enquadramento formal como injúria se individualizada.',
    situacaoEscola: 'Apelidos, piadas ou exclusão de atividades em razão do peso corporal do estudante.',
    fonteLegal: 'Código Penal, art. 140; Código Civil, art. 186.'
  },
  'Capacitismo': {
    termo: 'Capacitismo',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Discriminação em razão da deficiência: toda distinção, restrição ou exclusão que prejudique o exercício de direitos (art. 4º da Lei 13.146/2015). Praticar ou incitar é crime (art. 88).',
    termoAdequado: '"Capacitismo" está correto.',
    situacaoEscola: 'Recusa de adaptações razoáveis, exclusão de atividades, apelidos ou piadas sobre a deficiência do estudante.',
    fonteLegal: 'Lei 13.146/2015 (Lei Brasileira de Inclusão), arts. 4º e 88.'
  },
  'Xenofobia': {
    termo: 'Xenofobia',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Discriminação ou preconceito em razão da procedência nacional (Lei 7.716/1989, art. 20; Lei de Migração, Lei 13.445/2017).',
    termoAdequado: '"Xenofobia" está correto (discriminação por procedência nacional).',
    situacaoEscola: 'Discriminação contra estudante migrante internacional ou de outra nacionalidade.',
    fonteLegal: 'Lei 7.716/1989, art. 20; Lei 13.445/2017 (Lei de Migração), art. 3º.'
  },
  'Preconceito religioso': {
    termo: 'Preconceito religioso',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Discriminação ou preconceito em razão de religião (Lei 7.716/1989, art. 20). A liberdade de crença é garantia constitucional inviolável (CF, art. 5º, VI).',
    termoAdequado: '"Preconceito religioso" está correto.',
    situacaoEscola: 'Zombaria de crenças ou práticas religiosas, proibição de vestimentas/símbolos, intolerância entre credos.',
    fonteLegal: 'Lei 7.716/1989, art. 20; Constituição Federal, art. 5º, VI.'
  },
  'Preconceito linguístico': {
    termo: 'Preconceito linguístico',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Discriminação por sotaque, dialeto ou variação linguística regional/social. Quando dirigida a pessoa determinada, pode configurar injúria (Código Penal, art. 140).',
    termoAdequado: 'Manter "preconceito linguístico"; no registro formal individual, enquadrar como injúria.',
    situacaoEscola: 'Zombaria do sotaque, forma de falar ou vocabulário de estudantes de outras regiões ou classes.',
    fonteLegal: 'Código Penal, art. 140.'
  },
  'Preconceito socioeconômico': {
    termo: 'Preconceito socioeconômico',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Discriminação baseada na condição financeira ou classe social, ferindo a dignidade da pessoa humana (CF, art. 1º, III). Configura injúria se individualizada.',
    termoAdequado: 'Manter "preconceito socioeconômico" ou "discriminação social".',
    situacaoEscola: 'Zombaria por roupas, materiais escolares, moradia ou renda familiar do estudante.',
    fonteLegal: 'Constituição Federal, art. 1º, III; Código Penal, art. 140.'
  },
  'Discriminação por aparência': {
    termo: 'Discriminação por aparência',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Ofensa em razão de características estéticas, marcas corporais ou vestimenta. Configura injúria (art. 140 do CP); se houver traço racial, enquadra-se em racismo/injúria racial.',
    termoAdequado: 'Manter "discriminação por aparência"; verificar sobreposição com capacitismo ou racismo.',
    situacaoEscola: 'Comentários ofensivos ou exclusão por causa de altura, cabelo, roupas, cicatrizes ou marcas visíveis.',
    fonteLegal: 'Código Penal, art. 140.'
  },
  'Discriminação de gênero': {
    termo: 'Discriminação de gênero',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Igualdade entre homens e mulheres garantida na CF (art. 5º, I). Configura injúria quando dirigida a pessoa determinada (CP, art. 140).',
    termoAdequado: '"Discriminação de gênero" ou "sexismo".',
    situacaoEscola: 'Tratamento desigual entre meninos e meninas, piadas sexistas, proibição de atividades em função do gênero.',
    fonteLegal: 'Constituição Federal, art. 5º, I; Código Penal, art. 140.'
  },
  'Etarismo': {
    termo: 'Etarismo',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Discriminação em razão da idade. No ambiente escolar entre estudantes, enquadra-se como injúria qualificada por idade (CP, art. 140, §3º).',
    termoAdequado: 'Manter "etarismo".',
    situacaoEscola: 'Discriminação de estudantes com distorção idade-série, repetentes ou servidores por causa da idade.',
    fonteLegal: 'Código Penal, art. 140, §3º.'
  },
  'Machismo': {
    termo: 'Machismo',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Atitude ou sistema de crenças de superioridade masculina e papéis rígidos de gênero. Quando ofende a dignidade individual, configura injúria (CP, art. 140).',
    termoAdequado: 'Manter "machismo" como categoria descritiva pedagógica.',
    situacaoEscola: 'Comentários depreciativos, restrição de atividades ou tratamento desigual baseado em estereótipos de gênero.',
    fonteLegal: 'Constituição Federal, art. 5º, I; Código Penal, art. 140.'
  },
  'Misoginia': {
    termo: 'Misoginia',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Aversão, desprezo ou ódio sistemático contra mulheres. Previsto no art. 121-A do CP como circunstância de feminicídio; no ambiente escolar, configura injúria grave e discriminação hostil.',
    termoAdequado: 'Manter "misoginia" como categoria distinta de machismo, marcando maior hostilidade e sinal de alerta precoce.',
    situacaoEscola: 'Falas ou condutas de ódio, desprezo e desqualificação sistemática contra estudantes ou professoras.',
    fonteLegal: 'Código Penal, art. 121-A, §1º, II (Lei 14.994/2024); art. 140.'
  },
  'Classismo': {
    termo: 'Classismo',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Discriminação baseada em classe social ou condição econômica. Configura injúria (art. 140 do CP) quando individualizada.',
    termoAdequado: 'Manter "classismo" (sinônimo de preconceito socioeconômico).',
    situacaoEscola: 'Zombaria, exclusão ou tratamento diferenciado por causa de renda, profissão dos pais ou bairro de moradia.',
    fonteLegal: 'Constituição Federal, art. 1º, III; Código Penal, art. 140.'
  },
  'Discriminação regional': {
    termo: 'Discriminação regional',
    dimensao: '5. Discriminação e preconceito',
    significado: 'Discriminação por procedência de outra região ou estado do Brasil. Distingue-se da xenofobia (estrangeira). Configura injúria simples (CP, art. 140, caput).',
    termoAdequado: 'Manter "discriminação regional"; quando o foco for o sotaque, ver também preconceito linguístico.',
    situacaoEscola: 'Zombaria, apelidos ou exclusão de estudante por ter vindo de outro estado ou região do país.',
    fonteLegal: 'Código Penal, art. 140, caput.'
  },

  // 6. Violências interpessoais
  'Agressão física': {
    termo: 'Agressão física',
    dimensao: '6. Violências interpessoais',
    significado: 'Lesão corporal: ofender a integridade corporal ou a saúde de outrem (art. 129 do Código Penal). Quando praticada por adolescente, configura ato infracional análogo à lesão corporal (ECA, art. 103).',
    termoAdequado: '"Agressão física" está adequado como termo de uso corrente; tecnicamente corresponde a "lesão corporal".',
    situacaoEscola: 'Socos, empurrões, chutes, arremesso de objetos entre estudantes, ou de adulto contra estudante, causando dor, marca ou lesão.',
    fonteLegal: 'Código Penal, art. 129; Estatuto da Criança e do Adolescente (Lei 8.069/1990), art. 103.'
  },
  'Agressão verbal': {
    termo: 'Agressão verbal',
    dimensao: '6. Violências interpessoais',
    significado: 'Crimes contra a honra: calúnia (art. 138, imputar falsamente crime), difamação (art. 139, imputar fato ofensivo à reputação) e injúria (art. 140, ofender a dignidade ou o decoro).',
    termoAdequado: 'Manter "agressão verbal" como categoria pedagógica; especificar se houve xingamento, boato difamatório ou calúnia.',
    situacaoEscola: 'Xingamentos, apelidos pejorativos, humilhações e ofensas verbais entre estudantes ou contra funcionários.',
    fonteLegal: 'Código Penal, arts. 138, 139 e 140.'
  },
  'Ameaça': {
    termo: 'Ameaça',
    dimensao: '6. Violências interpessoais',
    significado: 'Ameaçar alguém, por palavra, escrito, gesto ou meio simbólico, de causar-lhe mal injusto e grave (art. 147 do Código Penal).',
    termoAdequado: '"Ameaça" é o termo tecnicamente correto.',
    situacaoEscola: 'Estudante que ameaça agredir, machucar ou prejudicar colega, professor ou funcionário.',
    fonteLegal: 'Código Penal, art. 147; ECA, art. 103.'
  },
  'Intimidação sistemática (bullying)': {
    termo: 'Intimidação sistemática (bullying)',
    dimensao: '6. Violências interpessoais',
    significado: 'Intimidar sistematicamente, mediante violência física ou psicológica, intencional e repetitiva, sem motivação discriminatória específica evidente (Código Penal, art. 146-A, incluído pela Lei 14.811/2024; Lei 13.185/2015).',
    termoAdequado: '"Intimidação sistemática (bullying)" — nomenclatura oficial da legislação.',
    situacaoEscola: 'Apelidos repetitivos, exclusão social sistemática e humilhação recorrente entre pares.',
    fonteLegal: 'Código Penal, art. 146-A (Lei 14.811/2024); Lei 13.185/2015.'
  },
  'Intimidação sistemática virtual (cyberbullying)': {
    termo: 'Intimidação sistemática virtual (cyberbullying)',
    dimensao: '6. Violências interpessoais',
    significado: 'Forma qualificada de intimidação sistemática praticada em ambiente digital, redes sociais, aplicativos ou jogos on-line (CP, art. 146-A, parágrafo único).',
    termoAdequado: '"Intimidação sistemática virtual (cyberbullying)" / Cyberagressão.',
    situacaoEscola: 'Ofensas, exposição de dados, humilhação e perseguição em grupos de WhatsApp, redes sociais ou jogos on-line.',
    fonteLegal: 'Código Penal, art. 146-A, parágrafo único (Lei 14.811/2024).'
  },
  'Intimidação (ato isolado)': {
    termo: 'Intimidação (ato isolado)',
    dimensao: '6. Violências interpessoais',
    significado: 'Ato único de intimidação, sem reiteração (distinto do bullying). Configura ameaça (CP, art. 147) ou constrangimento ilegal (CP, art. 146).',
    termoAdequado: 'Distinguir claramente de bullying; enquadrar como ameaça ou constrangimento ilegal pontual.',
    situacaoEscola: 'Episódio único de intimidação entre estudantes ou entre adulto e estudante.',
    fonteLegal: 'Código Penal, arts. 146 e 147; Lei 13.185/2015.'
  },
  'Extorsão': {
    termo: 'Extorsão',
    dimensao: '6. Violências interpessoais',
    significado: 'Constranger alguém, mediante violência ou grave ameaça, com intuito de obter vantagem econômica indevida (Código Penal, art. 158).',
    termoAdequado: '"Extorsão" é o termo tecnicamente correto.',
    situacaoEscola: 'Coagir colega para obter dinheiro, lanche ou objetos pessoais sob ameaça de agressão ou exposição.',
    fonteLegal: 'Código Penal, art. 158; ECA, art. 103.'
  },
  'Shaming': {
    termo: 'Shaming',
    dimensao: '6. Violências interpessoais',
    significado: 'Exposição pública de alguém a constrangimento ou ridicularização coletiva (body shaming, slut shaming). Configura injúria, difamação ou cyberbullying.',
    termoAdequado: 'Manter "shaming" como termo descritivo do fenômeno.',
    situacaoEscola: 'Exposição pública para humilhar colega por causa do corpo, roupas, comportamento ou vida pessoal.',
    fonteLegal: 'Código Penal, arts. 139, 140 e 146-A (Lei 14.811/2024).'
  },
  'Perseguição (stalking)': {
    termo: 'Perseguição (stalking)',
    dimensao: '6. Violências interpessoais',
    significado: 'Perseguir alguém reiteradamente, ameaçando sua integridade física/psicológica ou invadindo sua privacidade e liberdade (Código Penal, art. 147-A).',
    termoAdequado: 'Manter "perseguição (stalking)" como termo próprio.',
    situacaoEscola: 'Monitoramento insistente, seguir a vítima nos arredores da escola ou envio compulsivo de mensagens.',
    fonteLegal: 'Código Penal, art. 147-A (Lei 14.132/2021).'
  },
  'Linchamento virtual': {
    termo: 'Linchamento virtual',
    dimensao: '6. Violências interpessoais',
    significado: 'Ataque em massa e coordenado/espontâneo de múltiplas pessoas contra um indivíduo em ambiente digital após viralização de conteúdo.',
    termoAdequado: 'Manter "linchamento virtual" para descrever o fenômeno coletivo em escala digital.',
    situacaoEscola: 'Publicação ou print que viraliza gerando onda massiva de ofensas, ameaças e exposição por dezenas de perfis.',
    fonteLegal: 'Código Penal, arts. 138, 139, 140 e 62, I.'
  },
  'Assédio moral': {
    termo: 'Assédio moral',
    dimensao: '6. Violências interpessoais',
    significado: 'Conduta abusiva e habitual com objetivo de humilhar, desestabilizar emocionalmente ou degradar a autoestima. Usado prioritariamente quando o agressor estiver em posição de autoridade/ascendência.',
    termoAdequado: 'Usar "assédio moral" prioritariamente quando envolver relação de autoridade/adulto; entre pares, preferir intimidação sistemática.',
    situacaoEscola: 'Humilhações repetidas, exposição negativa perante a turma ou tratamento hostil sistemático.',
    fonteLegal: 'Constituição Federal, art. 5º, V e X; Código Civil, arts. 186 e 927.'
  },

  // 7. Situações de risco à vida, à saúde e à segurança
  'Negligência': {
    termo: 'Negligência',
    dimensao: '7. Situações de risco à vida, à saúde e à segurança',
    significado: 'Privação de cuidados básicos, alimentação, saúde ou educação (ECA, arts. 4º, 13 e art. 56, IV, incluído pela Lei 15.240/2025). Comunicação obrigatória ao Conselho Tutelar.',
    termoAdequado: 'Manter "negligência"; especificar se é material (higiene, alimentação) ou educacional.',
    situacaoEscola: 'Sinais de que necessidades básicas de saúde, alimentação, higiene ou acompanhamento escolar não estão sendo supridas.',
    fonteLegal: 'Estatuto da Criança e do Adolescente, arts. 4º, 13, 56, IV (Lei 15.240/2025) e 245; CP, arts. 133, 244 e 246.'
  },
  'Porte de arma': {
    termo: 'Porte de arma',
    dimensao: '7. Situações de risco à vida, à saúde e à segurança',
    significado: 'Porte ilegal de arma de fogo (Lei 10.826/2003, arts. 14 e 16). O porte de arma branca (faca, estilete) configura infração gravíssima e agravante legal.',
    termoAdequado: 'Especificar se arma de fogo ou arma branca/objeto perfurocortante. Comunicação imediata à direção, autoridade policial e Conselho Tutelar.',
    situacaoEscola: 'Estudante flagrado com arma de fogo, faca, estilete ou objeto adaptado perfurocortante na escola.',
    fonteLegal: 'Lei 10.826/2003 (Estatuto do Desarmamento); ECA, art. 13.'
  },

  // 8. Violência sexual
  'Assédio sexual': {
    termo: 'Assédio sexual',
    dimensao: '8. Violência sexual',
    significado: 'Constranger alguém para obter vantagem sexual prevalecendo-se de superioridade hierárquica ou ascendência de cargo/função (Código Penal, art. 216-A). Exige hierarquia funcional.',
    termoAdequado: 'Usar quando houver relação hierárquica (adulto/servidor vs estudante). Entre estudantes de mesmo nível, o enquadramento é importunação sexual ou estupro de vulnerável.',
    situacaoEscola: 'Funcionário ou superior que usa sua posição para constranger estudante a obter favorecimento sexual.',
    fonteLegal: 'Código Penal, arts. 216-A; ECA, arts. 13 e 245.'
  },
  'Importunação sexual': {
    termo: 'Importunação sexual',
    dimensao: '8. Violência sexual',
    significado: 'Praticar contra alguém e sem sua anuência ato libidinoso para satisfazer a própria lascívia ou a de terceiro (Código Penal, art. 215-A, pena de 1 a 5 anos), sem violência/grave ameaça.',
    termoAdequado: '"Importunação sexual" (art. 215-A). Se a vítima tiver menos de 14 anos, reclassificar como estupro de vulnerável (art. 217-A).',
    situacaoEscola: 'Toque, carícia forçada ou contato físico de cunho sexual indesejado sem consentimento entre estudantes.',
    fonteLegal: 'Código Penal, art. 215-A (Lei 13.718/2018); ECA, arts. 13 e 245.'
  },
  'Abuso sexual': {
    termo: 'Abuso sexual',
    dimensao: '8. Violência sexual',
    significado: 'Termo abrangente para crimes contra a dignidade sexual de crianças e adolescentes, com destaque para o estupro de vulnerável (CP, art. 217-A: ato libidinoso com menor de 14 anos, violência presumida, pena 8 a 15 anos) e exploração sexual.',
    termoAdequado: 'Manter como categoria de acolhimento inicial; comunicação imediata e compulsória ao Conselho Tutelar e autoridade competente.',
    situacaoEscola: 'Relato, revelação espontânea ou suspeita de contato sexual, exploração ou aliciamento contra criança/adolescente.',
    fonteLegal: 'Código Penal, art. 217-A; ECA, arts. 5º, 13, 70-A, 240 a 241-C e 245; Lei 13.431/2017.'
  },
  'Divulgação não consensual de imagem íntima': {
    termo: 'Divulgação não consensual de imagem íntima',
    dimensao: '8. Violência sexual',
    significado: 'Disponibilizar, transmitir, publicar ou divulgar registro audiovisual contendo nudez ou cena de sexo sem consentimento (Código Penal, art. 218-C). Quando envolve criança/adolescente, aplica-se o ECA (arts. 240 a 241-C).',
    termoAdequado: '"Divulgação não consensual de imagem íntima" está correto.',
    situacaoEscola: 'Compartilhamento em redes sociais ou mensageiros de fotos ou vídeos íntimos de estudantes sem autorização.',
    fonteLegal: 'Código Penal, art. 218-C (Lei 13.718/2018); ECA, arts. 240 a 241-C.'
  },

  // Outra / Não contemplada
  'Outra': {
    termo: 'Outra ocorrência / Não contemplada',
    dimensao: 'Outra / Não contemplada',
    significado: 'Esta opção deve ser utilizada e preenchida obrigatoriamente quando o ocorrido não coincide com nenhum dos itens das 8 dimensões citadas acima.',
    termoAdequado: 'Outra (com especificação descritiva detalhada no campo fornecido).',
    situacaoEscola: 'Fato atípico, conflito externo ou situação institucional que não coincide com nenhuma das condutas catalogadas nas dimensões pedagógicas anteriores.',
    fonteLegal: 'Regimento Escolar e Diretrizes da SEDUC Contagem.'
  }
};
