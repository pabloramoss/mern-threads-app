import { UserButton } from '@clerk/nextjs';

const Home: React.FC = () => {
  return (
    <main>
      <UserButton afterSignOutUrl="/" />
    </main>
  );
};

export default Home;
