
# 📱 Mottu Mobile

Aplicativo móvel desenvolvido em **React Native + TypeScript** para gestão de pátio de motos, permitindo visualizar vagas disponíveis e adicionar motos ao pátio de forma simples e intuitiva.

---

## 🚀 Funcionalidades

- Listar vagas disponíveis no pátio.
- Adicionar motos às vagas.
- Verificar status das vagas (ocupada ou livre).
- Gerenciar informações do pátio em tempo real.

---

## 🛠 Tecnologias

- **React Native** – Desenvolvimento de app mobile multiplataforma.  
- **TypeScript** – Tipagem estática para maior segurança no código.  
- **AsyncStorage** – Armazenamento local de dados.  
- **Axios** – Comunicação com APIs.  

---

## 📁 Estrutura do Projeto

\`\`\`
mottu-mobile/
│
├── assets/             # Recursos estáticos (imagens, ícones)
├── src/
│   ├── screens/       # Telas do aplicativo
│   ├── components/    # Componentes reutilizáveis
│   ├── services/      # Integração com APIs
│   ├── theme/         # Configurações de tema
│   └── utils/         # Funções utilitárias
├── App.tsx            # Componente principal
├── index.ts           # Ponto de entrada
├── package.json       # Dependências e scripts
└── tsconfig.json      # Configuração TypeScript
\`\`\`

---

## ⚙️ Instalação

1. Clone o repositório:
git clone https://github.com/LuannZeiro/mottu-mobile.git
cd mottu-mobile


2. Instale as dependências:
npm install

3. Execute o app no Android:
npm start

## 📌 Como funciona a funcionalidade de adicionar moto

O app permite cadastrar motos em vagas específicas do pátio seguindo esta lógica:

1. O usuário visualiza a lista de vagas.
2. Ao selecionar uma vaga livre, é exibido um formulário para inserir os dados da moto.
3. Ao confirmar, o app envia a requisição para a API registrar a moto naquela vaga.
4. A vaga muda de status para ocupada.

---

## Integrantes

- Caio Nyimi - RM556331
- Henzo Puchetti - RM555179
- Luann Mariano - RM558548
