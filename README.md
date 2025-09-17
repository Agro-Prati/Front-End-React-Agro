# Agro+Prati - Plataforma Agrícola Inteligente

Uma aplicação React moderna para o agronegócio, desenvolvida com Vite, React Router e tecnologias de ponta.

## 🚀 Tecnologias Utilizadas

- **React 19** - Framework JavaScript para interfaces de usuário
- **Vite** - Build tool e dev server ultra-rápido
- **React Router DOM** - Roteamento de páginas
- **Vitest** - Framework de testes
- **Testing Library** - Utilitários para testes de componentes
- **CSS Variables** - Sistema de temas (Light/Dark Mode)
- **FontAwesome** - Biblioteca de ícones

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header/         # Cabeçalho com navegação
│   ├── Nav/            # Menu de navegação
│   ├── Hero/           # Seção principal
│   ├── Sobre/          # Seção sobre
│   ├── Solucoes/       # Seção de soluções
│   ├── Parceiros/      # Seção de parceiros
│   ├── ContactForm/    # Formulário de contato
│   ├── Footer/         # Rodapé
│   ├── Chatbot/        # Chatbot IA agrícola
│   └── ui/             # Componentes de UI
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Página inicial (landing page)
│   ├── Sobre.jsx       # Página sobre nós
│   ├── Solucoes.jsx    # Página de soluções
│   ├── Parceiros.jsx   # Página de parceiros
│   └── Contato.jsx     # Página de contato
├── App.jsx             # Configuração de rotas
├── App.css             # Estilos globais
├── index.css           # CSS com variáveis de tema
└── main.jsx            # Ponto de entrada
```

## 🛣️ Sistema de Rotas

- `/` - Página inicial (Home)
- `/sobre` - Sobre nós
- `/solucoes` - Nossas soluções
- `/parceiros` - Parceiros
- `/contato` - Contato

## 🎨 Funcionalidades

- **Tema Dark/Light**: Alternância automática respeitando preferências do sistema
- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Chatbot IA**: Assistente agrícola inteligente
- **Navegação Intuitiva**: Menu responsivo com estados ativos
- **Acessibilidade**: Suporte completo a navegação por teclado e leitores de tela

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage
```

## 🚀 Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📱 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build otimizado para produção
- `npm run preview` - Preview do build de produção
- `npm test` - Executa os testes
- `npm run lint` - Executa o linter



