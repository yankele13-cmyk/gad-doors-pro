import HomeContent from '@/components/home/HomeContent';

// Example of server-side metadata export
export const metadata = {
  title: 'GadDoors | דלתות פנים פרימיום ירושלים',
  description: 'דלתות פנים יוקרתיות בירושלים. עיצוב מודרני, התקנה מקצועית, 5 שנות אחריות.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomeContent />;
}
