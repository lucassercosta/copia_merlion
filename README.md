# Site Multilíngue Merlion

Este é um site multilíngue para Merlion IT com suporte para Português, Inglês e Espanhol.

## Características

- Suporte para três idiomas (PT, EN, ES)
- Mudança de idioma via parâmetro `?locale=` na URL
- Servidor Node.js/Express para gerenciar as diferentes versões do site
- Imagens compartilhadas entre todas as versões de idioma

## Requisitos

- Node.js (versão 14 ou superior)
- NPM

## Instalação

```bash
# Instalar dependências
npm install
```

## Executando localmente

```bash
# Iniciar o servidor (default: porta 3000)
npm start
```

## Acessando o site

- Português: `http://localhost:3000/`
- Inglês: `http://localhost:3000/?locale=en`
- Espanhol: `http://localhost:3000/?locale=es`

## Implantação no Railway

1. Faça login no [Railway](https://railway.app/)
2. Conecte seu repositório GitHub
3. Selecione este repositório
4. Deploy automático sem configuração adicional (o package.json já está configurado)

## Estrutura de arquivos

- `server.js` - Servidor Express
- `www.merlionit.com/index.html` - Versão em português
- `www.merlionit.com/index_en.html` - Versão em inglês
- `www.merlionit.com/index_es.html` - Versão em espanhol
- `merlionit.com/storage/app/uploads/` - Imagens de conteúdo compartilhadas
