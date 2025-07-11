FROM node:18
WORKDIR /app
COPY . .
RUN npm install
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
CMD ["/wait-for-it.sh", "postgres:5432", "--", "npm", "start"]
