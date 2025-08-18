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

## Link do Deploy do game
- mathwizardsgame.netlify.app
- <img width="474" height="161" alt="image" src="https://github.com/user-attachments/assets/7169f16d-97b6-485a-9791-845f2120c101" />




## Como Executar o Projeto na sua IDE
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

## Screenshots (Imagem da tela de login criada por IA (Será feito um update)
<img width="1861" height="951" alt="image" src="https://github.com/user-attachments/assets/1c85927d-8f12-4807-93b6-c5c490e4cc90" />
<img width="1858" height="948" alt="image" src="https://github.com/user-attachments/assets/f9311c5f-7264-4a7f-8470-1642d8fa72cc" />
<img width="1874" height="949" alt="image" src="https://github.com/user-attachments/assets/29669f86-80bd-42a2-8311-8e0f139d325d" />
<img width="1873" height="950" alt="image" src="https://github.com/user-attachments/assets/28b5e7b9-b93a-42ec-b318-d8f58556e2e7" />
<img width="1872" height="950" alt="image" src="https://github.com/user-attachments/assets/62748a1f-4e46-4987-93d9-c3da0e077de5" />


## Próximas Melhorias

- Modo multijogador
- Tabela de classificação
- Mais tipos de questões matemáticas
- Temas personalizáveis
- Modo offline
