import dynamic from 'next/dynamic';

const RLayersPage = dynamic(() => import('~/ol-rlayers/rlayers-page'), {
  ssr: false,
});
const Home = () => {
  return (
    <main>
      <div className="text-lg">Hello, World!</div>
      <h1 className="text-2xl">Openlayers using RLayers</h1>
      <RLayersPage />
    </main>
  );
};

export default Home;
