# 🚀 Passos para Deploy - Garagem 599

## ✅ Mudanças Nesta Versão (v1.0.1)

### Serviços Atualizados:
1. ✅ **Unificado serviço de Filtro** - Agora só existe "Troca de Filtro de Ar" que cobre motor e ar condicionado
2. ✅ **Nova imagem Auto Elétrica** - Imagem profissional com bateria automotiva
3. ✅ **Nova imagem Filtro de Ar** - Comparação visual de filtros novo vs usado
4. ✅ **Preço atualizado** - Filtro de Ar agora "A partir de R$ 60" (antes "Sob orçamento")

### Arquivos Modificados:
- `client/src/lib/services.ts` - Serviços atualizados e imagens novas
- `public/service-worker.js` - Versão 1.0.1
- `client/src/lib/version-check.ts` - Versão 1.0.1
- `public/version.json` - Versão 1.0.1
- `client/index.html` - Meta tag versão 1.0.1

---

## 📋 Comandos Git para Deploy

### ⚠️ IMPORTANTE: Configuração Inicial do Remote

Se você ainda não configurou o repositório remoto do GitHub, execute primeiro:

```bash
# Verifique se o remote está configurado
git remote -v
```

**Se não aparecer nada ou estiver errado, configure:**

```bash
# Adicione o remote correto (substitua com seu usuário/repositório)
git remote add origin https://github.com/SEU_USUARIO/garagem-599.git

# Ou se já existir mas estiver errado, atualize:
git remote set-url origin https://github.com/SEU_USUARIO/garagem-599.git
```

---

## 🔄 Deploy - Passo a Passo

### Opção 1: Primeira Vez (Branch não existe no GitHub)

```bash
# 1. Adicionar todos os arquivos
git add .

# 2. Fazer commit
git commit -m "feat: Atualizar serviços e imagens - v1.0.1

- Unificado serviços de filtro (motor + ar condicionado) com preço R$ 60
- Nova imagem profissional para Auto Elétrica
- Nova imagem comparativa para Filtro de Ar
- Removido serviço duplicado de Filtro de Ar Condicionado

Versão: 1.0.1"

# 3. Push criando a branch no remote
git push -u origin main
```

### Opção 2: Branch Já Existe no GitHub

```bash
# 1. Adicionar todos os arquivos
git add .

# 2. Fazer commit
git commit -m "feat: Atualizar serviços e imagens - v1.0.1"

# 3. Push normal
git push origin main
```

**Ou se sua branch principal é `master`:**
```bash
git push origin master
```

---

## ⚡ Deploy Automático no Vercel

Após fazer o `git push`, o Vercel irá:

1. ✅ Detectar o push automaticamente
2. ✅ Iniciar o build (`npm run build`)
3. ✅ Processar as novas imagens
4. ✅ Fazer deploy da nova versão
5. ✅ Site estará atualizado em ~2-3 minutos

### 📊 Monitorar o Deploy

1. Acesse [vercel.com/dashboard](https://vercel.com/dashboard)
2. Selecione o projeto "garagem-599"
3. Veja o status do deploy em tempo real
4. Quando aparecer "Ready", o site está atualizado!

---

## 🔍 Verificar se Funcionou

### 1. Verificar os Serviços Atualizados

Acesse o site e verifique:

✅ **Seção de Serviços para Carros:**
- Deve aparecer apenas **1 serviço de filtro**: "Troca de Filtro de Ar"
- **Não deve** mais aparecer "Troca de Filtro de Ar Condicionado" separado
- Preço deve estar: "A partir de R$ 60"
- Descrição: "Substituição do filtro de ar do motor e ar condicionado"

✅ **Imagens Novas:**
- **Auto Elétrica**: Foto com bateria automotiva sendo manuseada
- **Filtro de Ar**: Comparação visual de filtro sujo vs limpo

### 2. Verificar Console do Navegador

Pressione `F12` → Console:
```
[Version Check] Service Worker registered
```

### 3. Verificar Versão Atual

No console, digite:
```javascript
sessionStorage.getItem('app_version')
```

Deve retornar: `"1.0.1"`

**Nota:** Em modo de desenvolvimento, o sistema de verificação de versão fica desabilitado. Você verá isso funcionando apenas em produção (após deploy no Vercel).

---

## 🎯 O Que Esperar Após Deploy

### Para Novos Visitantes:
- Verão imediatamente a versão 1.0.1
- Apenas 1 serviço de filtro (unificado)
- Novas imagens profissionais

### Para Usuários que Já Estavam no Site:
- Em até **10 minutos**, verão a notificação:
  - "✨ Nova versão disponível! Atualizando..."
- Página recarregará automaticamente
- Verão todas as mudanças

---

## 🔄 Próximas Atualizações

Quando fizer novas mudanças:

### 1. Atualize a Versão (4 arquivos):

```bash
# Exemplo: 1.0.1 → 1.0.2

# Arquivo 1: public/service-worker.js
const CACHE_VERSION = 'v1.0.2';

# Arquivo 2: client/src/lib/version-check.ts
export const APP_VERSION = '1.0.2';

# Arquivo 3: public/version.json
{
  "version": "1.0.2",
  "lastUpdated": "2025-10-20T20:00:00Z"
}

# Arquivo 4: client/index.html
<meta name="app-version" content="1.0.2">
```

### 2. Commit e Push:

```bash
git add .
git commit -m "feat: [descrição] - v1.0.2"
git push origin main
```

---

## 📞 Troubleshooting

### ❌ Erro: "UNKNOWN_REF - Remote ref missing"

**Causa:** A branch não existe no GitHub ainda.

**Solução:**
```bash
# Use -u para criar a branch no remote
git push -u origin main
```

### ❌ Erro: "No remote repository"

**Causa:** Remote do GitHub não configurado.

**Solução:**
```bash
# Configure o remote (use seu repositório)
git remote add origin https://github.com/SEU_USUARIO/garagem-599.git

# Depois faça o push
git push -u origin main
```

### ❌ Erro: "Permission denied"

**Causa:** Credenciais do GitHub não configuradas.

**Solução:**
1. Configure seu GitHub token no Replit
2. Ou use SSH keys
3. Ou faça push manualmente via GitHub Desktop

### ⚠️ Site não atualiza após deploy

**Soluções:**
1. **Hard Refresh:** `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
2. **Limpar Cache:** `Ctrl+Shift+Delete` → Limpar cache
3. **Aguardar:** Sistema atualiza automaticamente em até 10 minutos

### ⚠️ Vercel não está fazendo deploy

**Verifique:**
1. Repositório conectado ao Vercel
2. Settings → Git → Webhook ativo
3. Logs de deploy no dashboard

---

## ✅ Checklist Pré-Deploy

Antes de fazer o push, confirme:

- [x] Serviço "Filtro de Ar Condicionado" foi removido
- [x] Serviço "Filtro de Ar" foi atualizado (nome, descrição, preço)
- [x] Imagem Auto Elétrica atualizada (autoeletrica_1760997197795.jpg)
- [x] Imagem Filtro de Ar atualizada (fitlrodear_1760997197793.webp)
- [x] Versão 1.0.1 em todos os 4 arquivos
- [x] Git remote configurado corretamente
- [x] Pronto para fazer commit e push

---

## 🎉 Tudo Pronto!

Execute os comandos acima e em **3 minutos** seu site estará atualizado com:
- ✅ Serviços unificados (sem duplicatas)
- ✅ Imagens profissionais novas
- ✅ Preços atualizados
- ✅ Sistema de cache busting ativo

**Comando rápido para deploy:**
```bash
git add . && git commit -m "feat: Atualizar serviços e imagens - v1.0.1" && git push -u origin main
```
