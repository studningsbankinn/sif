# SIF

## Leiðbeiningar til að keyra upp locally.

1. Sæktu API kerfið og keyrðu það upp locally, sjá nánar https://github.com/studningsbankinn/api

2. Clonaðu þetta repository
```
git clone https://github.com/studningsbankinn/sif.git
```

3. Settu eftirfarandi línu í host skrána hjá þér:
```
127.0.1.1	local.studningsbankinn.is
```

4. Settu upp .env.local skrá í rótina á þessu verkefni með eftirfarandi breytum
```
STUDNINGSBANKINN_API_URL=http://local.studningsbankinn.is:3001
STUDNINGSBANKINN_API_KEY=key-sem-þú-færð-í-admin-viðmótinu-fyrir-notendur
```

5. Gerðu `npm run install`
6. Gerðu `npm run serve`
7. Opnaðu vafrann á `http://local.studningsbankinn.is:1234/`