/**
 * Serviço para integração com a API do Chatbot (Flask + Gemini)
 *
 * Este serviço gerencia a comunicação com o backend do chatbot,
 * com fallback para respostas hardcoded quando a API real não estiver disponível.
 */

const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:5000';
const USE_REAL_CHATBOT = import.meta.env.VITE_USE_REAL_CHATBOT === 'true';

/**
 * Respostas hardcoded para modo MVP (quando USE_REAL_CHATBOT=false)
 */
const HARDCODED_RESPONSES = {
  plantio: [
    'Para plantio de milho, recomendo solo bem drenado e pH entre 5,5 e 6,8. Posso conectá-lo com especialistas em sua região.',
    'O melhor período para plantio de soja é entre setembro e dezembro. Quer dicas específicas para sua região?',
    'Para plantio de feijão, considere a época das águas (outubro-janeiro) ou da seca (março-junho).',
    'O plantio de trigo requer clima temperado e solo fértil. A melhor época é entre maio e julho.',
  ],
  pragas: [
    'Para controle de pragas, primeiro preciso identificar qual está afetando sua cultura. Pode descrever os sintomas?',
    'Lagarta-do-cartucho no milho? Recomendo monitoramento e controle integrado. Posso conectá-lo com especialistas.',
    'Problemas com pulgões? Existem soluções biológicas e químicas. Precisa de indicação de fornecedores?',
    'Ferrugem asiática na soja é séria! Recomendo aplicação preventiva de fungicidas. Quer falar com um agrônomo?',
  ],
  fertilizacao: [
    'A fertilização ideal depende da análise do solo. Temos parceiros que fazem análise na sua região.',
    'Para NPK, recomendo análise de solo primeiro. Posso conectá-lo com laboratórios credenciados.',
    'Adubação orgânica é excelente! Quer dicas sobre compostagem ou fornecedores de adubo orgânico?',
    'Calagem é importante para corrigir o pH do solo. Já fez análise do solo recentemente?',
  ],
  irrigacao: [
    'Sistema de irrigação por gotejamento é ideal para economizar água. Temos parceiros especializados.',
    'Para irrigação eficiente, considere horários adequados e monitoramento da umidade do solo.',
    'Problemas com irrigação? Posso conectá-lo com técnicos especializados em sua região.',
    'Aspersão ou gotejamento? Depende da cultura e do seu orçamento. Posso te ajudar a escolher.',
  ],
  clima: [
    'As condições climáticas são fundamentais para o sucesso da safra. Você monitora a previsão do tempo?',
    'Geadas podem prejudicar muito sua lavoura. Já pensou em sistemas de proteção?',
    'Seca prolongada? Considere sistemas de irrigação e culturas mais resistentes.',
  ],
  colheita: [
    'O momento ideal de colheita é crucial! Qual cultura você está cultivando?',
    'Para determinar o ponto de colheita, observe a umidade dos grãos e a maturação das plantas.',
    'Colheita mecanizada ou manual? Depende do tamanho da área e do tipo de cultura.',
  ],
  maquinas: [
    'Manutenção preventiva de máquinas agrícolas é essencial. Você tem um plano de manutenção?',
    'Para escolher o trator ideal, considere o tamanho da área e o tipo de operação.',
    'Temos parceiros que oferecem financiamento para máquinas agrícolas. Quer saber mais?',
  ],
  saudacao: [
    'Olá! Sou o assistente virtual da AgroPrati. Como posso ajudá-lo hoje?',
    'Oi! Bem-vindo à AgroPrati! Em que posso auxiliá-lo?',
    'Olá, agricultor! Estou aqui para ajudar com suas dúvidas sobre plantio e manejo.',
    'E aí, compadre! Pronto para turbinar sua produção? Como posso te ajudar hoje?',
  ],
  default: [
    'Interessante! Para essa questão específica, recomendo conversar com um especialista. Posso conectá-lo com profissionais qualificados.',
    'Essa é uma ótima pergunta! Temos especialistas que podem ajudar melhor. Quer que eu encontre um em sua região?',
    'Para orientações mais detalhadas, sugiro consultar nossos parceiros especialistas. Posso fazer essa conexão para você.',
    'Não tenho certeza sobre isso, mas posso te conectar com um especialista que vai saber te ajudar melhor!',
  ],
};

/**
 * Gera uma resposta hardcoded baseada na mensagem do usuário
 */
const generateHardcodedResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // Saudações
  if (
    msg.includes('olá') ||
    msg.includes('oi') ||
    msg.includes('bom dia') ||
    msg.includes('boa tarde') ||
    msg.includes('boa noite')
  ) {
    return getRandomMessage(HARDCODED_RESPONSES.saudacao);
  }

  // Plantio
  if (
    msg.includes('plantio') ||
    msg.includes('plantar') ||
    msg.includes('semear') ||
    msg.includes('cultivar')
  ) {
    return getRandomMessage(HARDCODED_RESPONSES.plantio);
  }

  // Pragas
  if (
    msg.includes('praga') ||
    msg.includes('inseto') ||
    msg.includes('lagarta') ||
    msg.includes('pulgão') ||
    msg.includes('ferrugem') ||
    msg.includes('doença')
  ) {
    return getRandomMessage(HARDCODED_RESPONSES.pragas);
  }

  // Fertilização
  if (
    msg.includes('adubo') ||
    msg.includes('fertilizante') ||
    msg.includes('npk') ||
    msg.includes('nutrição') ||
    msg.includes('calagem')
  ) {
    return getRandomMessage(HARDCODED_RESPONSES.fertilizacao);
  }

  // Irrigação
  if (msg.includes('irrigação') || msg.includes('água') || msg.includes('irrigar')) {
    return getRandomMessage(HARDCODED_RESPONSES.irrigacao);
  }

  // Clima
  if (
    msg.includes('clima') ||
    msg.includes('chuva') ||
    msg.includes('seca') ||
    msg.includes('geada') ||
    msg.includes('tempo')
  ) {
    return getRandomMessage(HARDCODED_RESPONSES.clima);
  }

  // Colheita
  if (msg.includes('colheita') || msg.includes('colher') || msg.includes('safra')) {
    return getRandomMessage(HARDCODED_RESPONSES.colheita);
  }

  // Máquinas
  if (
    msg.includes('máquina') ||
    msg.includes('trator') ||
    msg.includes('equipamento') ||
    msg.includes('maquinário')
  ) {
    return getRandomMessage(HARDCODED_RESPONSES.maquinas);
  }

  // Default
  return getRandomMessage(HARDCODED_RESPONSES.default);
};

/**
 * Retorna uma mensagem aleatória de um array
 */
const getRandomMessage = (messagesArray) => {
  return messagesArray[Math.floor(Math.random() * messagesArray.length)];
};

/**
 * Envia uma mensagem para o chatbot
 * @param {string} message - Mensagem do usuário
 * @returns {Promise<string>} - Resposta do chatbot
 */
export const sendChatMessage = async (message) => {
  // Se usar respostas hardcoded (modo MVP)
  if (!USE_REAL_CHATBOT) {
    //console.log('🤖 Usando respostas hardcoded (VITE_USE_REAL_CHATBOT=false)');
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 800));
    return generateHardcodedResponse(message);
  }

  // Usar API real do Gemini
  //console.log('🤖 Usando API Gemini real (VITE_USE_REAL_CHATBOT=true)');
  try {
    const response = await fetch(`${CHATBOT_API_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // A API retorna {answer: "..."}
    if (data.answer) {
      return data.answer;
    } else if (data.error) {
      throw new Error(data.error);
    } else {
      throw new Error('Resposta inválida da API');
    }
  } catch (error) {
    console.error('❌ Erro ao chamar API do chatbot:', error);

    // Fallback para respostas hardcoded em caso de erro
   //console.log('⚠️ Usando fallback para respostas hardcoded');
    return generateHardcodedResponse(message);
  }
};

/**
 * Gera um plano de safra personalizado
 * @param {string[]} culturas - Array com nomes das culturas
 * @returns {Promise<string>} - Plano de safra gerado
 */
export const generatePlanoSafra = async (culturas) => {
  if (!culturas || culturas.length === 0) {
    throw new Error('Por favor, forneça pelo menos uma cultura para o plano de safra.');
  }

  // Se usar respostas hardcoded
  if (!USE_REAL_CHATBOT) {
    //console.log('🌾 Gerando plano de safra hardcoded');
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return `# 🌾 Plano de Safra Personalizado

## Culturas Selecionadas
${culturas.map((c) => `- ${c}`).join('\n')}

## Cronograma Recomendado

### ${culturas[0]}
- **Preparo do Solo**: Início de setembro
- **Plantio**: Outubro a novembro
- **Tratos Culturais**: Monitoramento quinzenal de pragas
- **Colheita Estimada**: Março a abril

${
  culturas.length > 1
    ? `### ${culturas[1]}
- **Preparo do Solo**: Início de agosto
- **Plantio**: Setembro a outubro
- **Tratos Culturais**: Adubação e irrigação regular
- **Colheita Estimada**: Janeiro a fevereiro`
    : ''
}

## Dicas Importantes
- Monitore as condições climáticas constantemente
- Faça análise de solo antes do plantio
- Considere rotação de culturas para melhor aproveitamento do solo
- Planeje sistemas de irrigação adequados

*Nota: Este é um plano básico. Recomendamos consultar um agrônomo para orientações específicas da sua região.*`;
  }

  // Usar API real
  //console.log('🌾 Gerando plano de safra com IA real');
  try {
    const response = await fetch(`${CHATBOT_API_URL}/planner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        culturas: culturas,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.answer) {
      return data.answer;
    } else if (data.error) {
      throw new Error(data.error);
    } else {
      throw new Error('Resposta inválida da API');
    }
  } catch (error) {
    console.error('❌ Erro ao gerar plano de safra:', error);
    throw error;
  }
};

/**
 * Calcula estimativa de aposentadoria rural
 * @param {Object} dados - Dados do trabalhador rural
 * @param {number} dados.idade - Idade atual
 * @param {string} dados.sexo - Sexo (masculino/feminino)
 * @param {number} dados.tempoTrabalhoRural - Anos de trabalho rural
 * @param {string} dados.tipoSegurado - Tipo de segurado
 * @returns {Promise<string>} - Estimativa de aposentadoria
 */
export const calcularAposentadoria = async (dados) => {
  const { idade, sexo, tempoTrabalhoRural, tipoSegurado } = dados;

  // Validações básicas
  if (!idade || !sexo || !tempoTrabalhoRural || !tipoSegurado) {
    throw new Error('Por favor, preencha todos os campos para calcular a aposentadoria.');
  }

  // Se usar respostas hardcoded
  if (!USE_REAL_CHATBOT) {
    //console.log('📊 Calculando aposentadoria (hardcoded)');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const idadeAposentadoria = sexo === 'masculino' ? 60 : 55;
    const tempoMinimo = 15;
    const tempoFaltante = Math.max(0, tempoMinimo - tempoTrabalhoRural);
    const idadeFaltante = Math.max(0, idadeAposentadoria - idade);

    const podeAposentar = tempoFaltante === 0 && idadeFaltante === 0;

    return `# 📊 Estimativa de Aposentadoria Rural

## Seus Dados
- **Idade atual**: ${idade} anos
- **Sexo**: ${sexo}
- **Tempo de trabalho rural**: ${tempoTrabalhoRural} anos
- **Tipo de segurado**: ${tipoSegurado}

## Requisitos para Aposentadoria (${tipoSegurado})
- **Idade mínima**: ${idadeAposentadoria} anos
- **Tempo mínimo de contribuição**: ${tempoMinimo} anos

## Situação Atual
${
  podeAposentar
    ? '✅ **Você já pode se aposentar!**\n\nRecomendamos procurar o INSS para dar entrada no benefício.'
    : `⏳ **Ainda não pode se aposentar**

**Falta:**
${idadeFaltante > 0 ? `- ${idadeFaltante} anos de idade` : ''}
${tempoFaltante > 0 ? `- ${tempoFaltante} anos de tempo de contribuição` : ''}

**Previsão de aposentadoria:** ${idade + Math.max(idadeFaltante, tempoFaltante)} anos`
}

## Próximos Passos
1. Continue contribuindo regularmente
2. Guarde todos os documentos que comprovam trabalho rural
3. Acompanhe sua situação no Meu INSS
4. Consulte um advogado previdenciário para orientações específicas

*Nota: Esta é uma estimativa básica. As regras podem variar. Consulte o INSS para informações precisas.*`;
  }

  // Usar API real
  //console.log('📊 Calculando aposentadoria com IA real');
  try {
    const response = await fetch(`${CHATBOT_API_URL}/calculate_retirement`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idade: parseInt(idade),
        sexo,
        tempo_trabalho_rural: parseInt(tempoTrabalhoRural),
        tipo_segurado: tipoSegurado,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.answer) {
      return data.answer;
    } else if (data.error) {
      throw new Error(data.error);
    } else {
      throw new Error('Resposta inválida da API');
    }
  } catch (error) {
    console.error('❌ Erro ao calcular aposentadoria:', error);
    throw error;
  }
};

/**
 * Verifica se o chatbot está online
 * @returns {Promise<boolean>}
 */
export const checkChatbotHealth = async () => {
  if (!USE_REAL_CHATBOT) {
    return true; // Sempre disponível em modo hardcoded
  }

  try {
    const response = await fetch(`${CHATBOT_API_URL}/`, {
      method: 'GET',
      timeout: 5000,
    });
    return response.ok;
  } catch (error) {
    console.warn('⚠️ Chatbot API não está disponível:', error.message);
    return false;
  }
};

/**
 * Retorna informações sobre o modo atual do chatbot
 * @returns {Object}
 */
export const getChatbotInfo = () => {
  return {
    mode: USE_REAL_CHATBOT ? 'real' : 'hardcoded',
    apiUrl: CHATBOT_API_URL,
    description: USE_REAL_CHATBOT
      ? 'Usando inteligência artificial real (Google Gemini)'
      : 'Usando respostas pré-definidas (Modo MVP)',
  };
};

export default {
  sendChatMessage,
  generatePlanoSafra,
  calcularAposentadoria,
  checkChatbotHealth,
  getChatbotInfo,
};
