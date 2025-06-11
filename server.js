import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware genérico para trocar idioma por sufixo _<locale>.html
app.get('*', (req, res, next) => {
  const locale = req.query.locale; // en, es
  if (!locale) return next();

  // Caminho solicitado (ex.: /index.html ou /contato.html)
  let requested = req.path === '/' ? '/index.html' : req.path;
  const staticDir = path.join(__dirname, 'www.merlionit.com');

  // Construir nome alternativo com sufixo
  if (requested.endsWith('.html')) {
    const filename = path.basename(requested, '.html'); // ex: index, contato
    const altPath = path.join(staticDir, `${filename}_${locale}.html`);
    if (fs.existsSync(altPath)) {
      return res.sendFile(altPath);
    }
  }
  // Se não existir, continua fluxo normal
  next();
});

// Arquivos estáticos com prioridade para imagens
app.use('/public/site/assets/images', express.static(path.join(__dirname, 'www.merlionit.com/public/site/assets/images')));
app.use('/public/site/assets', express.static(path.join(__dirname, 'www.merlionit.com/public/site/assets')));

// Middleware para garantir que todas as requisições de imagens sejam direcionadas para as mesmas imagens da versão PT
app.use((req, res, next) => {
  if (req.path.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
    console.log('Requisição de imagem:', req.url);
    const locale = req.query.locale;
    if (locale && locale !== 'pt') {
      req.url = req.url.replace(`?locale=${locale}`, '');
      console.log('URL modificada para:', req.url);
    }
  }
  next();
});

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'www.merlionit.com')));
// Fallback: servir quaisquer outros arquivos no diretório raiz (como paths "../merlionit.com/...")
app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Servidor Merlion rodando na porta ${PORT}`);
});
