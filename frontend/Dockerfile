# Použite oficiálny Node.js obraz ako základ
FROM node:18-alpine

# Nastavte pracovný adresár
WORKDIR /app

# Skopírujte package.json a package-lock.json
COPY package*.json ./

# Nainštalujte závislosti
RUN npm install

# Skopírujte zvyšok kódu aplikácie
COPY . .

# Vytvorte build
RUN npm run build

# Exponujte port, na ktorom Next.js beží (štandardne 3000)
EXPOSE 3000

# Definujte príkaz na spustenie aplikácie
CMD ["npm", "run", "start"]
