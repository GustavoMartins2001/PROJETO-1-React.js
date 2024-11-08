# Projeto SPA de Imagens de Gatos 🐱

Este é um projeto de aplicação de página única (SPA) em React que consome a [The Cat API](https://thecatapi.com/). Ele permite aos usuários buscar imagens de gatos de diversas raças, definir a quantidade de imagens e escolher raças específicas para filtrar. A aplicação também utiliza **React Bootstrap** para estilização e **React Context API** para gerenciamento de estado global.

## Funcionalidades
- **Busca de imagens**: Os usuários podem buscar imagens de gatos aleatórias ou de raças específicas.
- **Seleção de várias raças**: É possível selecionar múltiplas raças para busca.
- **Controle da quantidade de imagens**: Usuários podem definir entre 1 e 10 imagens a serem exibidas.
- **Modal de exibição**: As imagens são exibidas em um modal, que pode ser atualizado com uma nova busca usando os mesmos filtros sem fechar o modal.

## Tecnologias Utilizadas
- **React.js**: Framework principal da aplicação.
- **React Bootstrap**: Biblioteca para componentes de interface.
- **Axios**: Cliente HTTP para realizar requisições à API.

## Pré-requisitos
Para executar este projeto, você precisará de:
- **Node.js** e **npm** instalados no seu computador.

## Instalação
Siga os passos abaixo para instalar e rodar o projeto em sua máquina local:

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```
    Ou baixe o zip do projeto e abra o terminal dentro dele.

2. **Instale as dependências**:
    ```bash
    npm install
    ```

4. **Execute a aplicação**:
    ```bash
    npm start
    ```
    A aplicação estará disponível em `http://localhost:3000` no seu navegador.

## Uso
1. No campo de **Seleção de Raça**, escolha uma ou mais raças para buscar.
2. Defina a **quantidade de imagens** (1 a 10).
3. Clique em **Buscar Imagens** para ver as imagens selecionadas.
4. As imagens serão exibidas em um modal e você poderá repetir a busca sem fechar o modal.


