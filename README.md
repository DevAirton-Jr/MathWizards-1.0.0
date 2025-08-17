# MathWizards - Jogo de Matemática

MathWizards é um jogo educativo de matemática com sistema de login, níveis progressivos e perfil de usuário. O jogo foi desenvolvido para ajudar estudantes a praticar matemática de forma divertida e interativa.

## Funcionalidades

- **Sistema de Autenticação**: Registro e login de usuários
- **10 Níveis Progressivos**: Cada nível foca em diferentes operações matemáticas
- **Sistema de Desbloqueio**: Os níveis são desbloqueados sequencialmente conforme o jogador avança
- **Perfil de Usuário**: Os jogadores podem personalizar seu perfil com foto, nome, idade e biografia
- **Estatísticas de Jogo**: Acompanhamento do progresso do jogador

## Níveis do Jogo

1. Adição Básica
2. Subtração Básica
3. Multiplicação Básica
4. Divisão Básica
5. Adição Avançada
6. Subtração Avançada
7. Multiplicação Avançada
8. Divisão Avançada
9. Equações Simples
10. Desafio Final

## Tecnologias Utilizadas

- React.js
- Firebase (Autenticação, Firestore, Storage)
- React Router
- CSS Moderno

## Como Executar o Projeto

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Configure o Firebase:
   - Crie um projeto no Firebase
   - Ative a autenticação por email/senha
   - Configure o Firestore Database
   - Configure o Storage
   - Substitua as configurações no arquivo `firebase.js`
4. Execute o projeto com `npm start`

## Estrutura do Projeto

- `/src/components`: Componentes reutilizáveis
- `/src/contexts`: Contextos do React, incluindo autenticação
- `/src/pages`: Páginas principais da aplicação
- `/src/styles`: Arquivos CSS para estilização

## Requisitos para Passar de Nível

Para desbloquear o próximo nível, o jogador precisa acertar pelo menos 60% das questões do nível atual.

## Personalização do Perfil

Os usuários podem personalizar seu perfil com:
- Foto de perfil
- Nome
- Idade
- Biografia

## Próximas Melhorias

- Modo multijogador
- Tabela de classificação
- Mais tipos de questões matemáticas
- Temas personalizáveis
- Modo offline