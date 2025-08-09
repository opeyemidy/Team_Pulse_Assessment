import { members, mockTeams } from '@/data';
import { PrismaClient } from '../src/generated/prisma';
import { defaultSettings } from '@/app/(protected)/settings/constants';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  // await prisma.member.deleteMany();
  //   await prisma.team.deleteMany();
  await prisma.settings.deleteMany();

  console.log('🗑️  Cleared existing data');

  //   // Create teams
  //   const teams = await Promise.all(
  //     mockTeams.map(({ name, description, averageSentiment }) =>
  //       prisma.team.create({
  //         data: {
  //           name,
  //           description,
  //           averageSentiment,
  //         },
  //       })
  //     )
  //   );

  //   console.log('✅ Created teams');

  // Create members for each team
  // const membersData = members.map(({ name, email, sentiment, teamId }) => ({
  //   name,
  //   email,
  //   sentiment,
  //   teamId,
  // }));

  // await prisma.member.createMany({
  //   data: membersData,
  // });

  console.log('✅ Created members');

  // Create default settings
  await prisma.settings.create({
    data: defaultSettings,
  });

  console.log('✅ Created default settings');

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
