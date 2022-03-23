const fs = require('fs')
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
   await prisma.course.createMany({
      data: JSON.parse(fs.readFileSync(__dirname + '\\data.json', 'utf-8')),
   })
}

main()
   .catch(e => {
      console.error(e)
      process.exit(1)
   })
   .finally(async () => {
      await prisma.$disconnect()
   })
