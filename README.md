# Site Air Clean — guia rápido

Site estático (HTML + CSS + JavaScript puro), sem etapa de build. Abre direto no navegador e pode ser hospedado em qualquer serviço.

## Estrutura

```
index.html                  → página principal (todas as seções, incluindo os depoimentos)
politica-de-privacidade.html
css/styles.css              → cores, fontes e layout (cores no topo, em :root)
js/app.js                   → WhatsApp, menu, FAQ, galeria, formulário
assets/                     → logo e favicon
assets/trabalhos/           → fotos reais da Air Clean (do Perfil da Empresa no Google)
404.html                    → página de erro (endereço não encontrado)
.htaccess                   → HTTPS obrigatório, sem www, cache e compressão
robots.txt, sitemap.xml     → SEO

Páginas de serviço e cidade (SEO local):
instalacao-de-ar-condicionado-guarulhos/
limpeza-de-ar-condicionado-guarulhos/
manutencao-de-ar-condicionado-guarulhos/
pmoc-guarulhos-sao-paulo/
ar-condicionado-sao-paulo/
```

Ao criar uma página nova, inclua o endereço dela no `sitemap.xml`.

## Antes de publicar

1. **Domínio:** o site usa aircleanclimatização.com. Nos arquivos técnicos (`index.html`, `robots.txt`, `sitemap.xml`) ele aparece como `xn--aircleanclimatizao-itb3f.com`, que é o mesmo endereço no formato padrão da internet.
2. **Fotos:** para trocar ou adicionar, coloque o arquivo em `assets/trabalhos/` (.webp ou .jpg, cerca de 1000 px de largura) e copie um bloco `<figure class="work">` da seção Nossos trabalhos, ajustando `src`, `alt` e `data-cat` (instalacao, higienizacao, manutencao ou ambientes).
3. **Depoimentos:** ficam na seção Depoimentos do `index.html`. Copie um bloco `<figure class="review">` para adicionar um novo. Use somente avaliações reais.
4. **Nota do Google:** a nota 4,8 e o total de 54 avaliações estão escritos no `index.html`. Atualize de tempos em tempos.
5. **Mensagens do WhatsApp:** edite o bloco `MENSAGENS` em `js/app.js`.
6. **Dados legais:** inclua a razão social e o CNPJ no rodapé e na política de privacidade.

## Como publicar

**Netlify (mais simples, grátis):** acesse app.netlify.com/drop e arraste a pasta inteira. Depois, em Domain settings, conecte o seu domínio.

**Vercel:** crie um projeto, envie a pasta (ou um repositório GitHub com ela) e publique. Não há comando de build.

**Hostinger, Locaweb, HostGator (cPanel):** envie todo o conteúdo para a pasta `public_html` pelo Gerenciador de Arquivos ou por FTP.

## Depois de publicar

- Cadastre o site no **Google Search Console** e envie o `sitemap.xml`.
- No **Perfil da Empresa no Google**, adicione o link do site. Isso conecta o perfil ao site e ajuda nas buscas locais.
- Coloque o link do site na bio do Instagram.
