# Meu Dia: projeto do APK (Android)

O app roda dentro de um aplicativo Android criado com Capacitor. Não precisa mudar nenhum código.

## Caminho A: gerar o APK online, sem instalar nada (GitHub)
1. Crie uma conta gratuita em github.com e um repositório novo (pode ser privado).
2. Envie **todo o conteúdo desta pasta** para o repositório, incluindo a pasta oculta `.github`.
   Pelo site: "Add file" > "Upload files". Se a pasta `.github` não subir, crie o arquivo
   `.github/workflows/build-apk.yml` pelo botão "Create new file" e cole o conteúdo dele.
3. Abra a aba **Actions**, escolha **Gerar APK** e toque em **Run workflow**.
4. Quando terminar (uns 5 a 10 minutos), abra a execução e baixe **meu-dia-apk** em "Artifacts".
   Dentro do zip está o `app-debug.apk`.
5. Copie o APK para o celular e abra. O Android vai pedir para permitir a instalação de fontes
   desconhecidas.

## Caminho B: no computador, com Android Studio
1. Instale o Node.js 20 e o Android Studio.
2. Na pasta do projeto: `npm install`, depois `npx cap add android`, depois `npx cap sync android`.
3. Abra a pasta `android` no Android Studio e use **Build > Build APK(s)**.
4. Para o Android 13 ou mais novo, adicione em `android/app/src/main/AndroidManifest.xml`, antes de `</manifest>`:
   `<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>`

## Importante
- Este APK é de teste (debug). Serve para instalar no seu celular. Para publicar na Play Store é
  preciso assinar o app, o que é um passo à parte.
- **Seus dados:** no APK os dados ficam guardados dentro do app, no próprio celular. A sincronização
  pela conta do Claude não existe no APK. Para levar os dados da versão web, vá em Gráficos > Backup
  dos dados, toque em "Gerar backup", copie o texto e cole no APK em "Restaurar".
- **Lembretes:** com o APK, as tarefas com horário e as contas a pagar geram notificações do
  Android mesmo com o app fechado (conta: um dia antes e no dia, às 9h). A lista é reagendada
  sempre que você abre o app ou altera algo. Autorize as notificações quando o Android pedir.
- O ícone é o padrão do Capacitor. Para trocar, use o pacote `@capacitor/assets`.
