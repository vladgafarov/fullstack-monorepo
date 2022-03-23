const faker = require('faker')
// import faker from 'faker'
const fs = require('fs')

faker.locale = 'ru'
const data = []

for (let i = 0; i < 20; i++) {
   const obj = {
      title: faker.random.word(),
      description: faker.lorem.sentences(5),
      price: +faker.commerce.price(800, 10000, 0),
   }

   data.push(obj)
}

fs.writeFileSync(
   'prisma/seed/data.json',
   JSON.stringify(data, null, 2),
   'utf-8'
)
