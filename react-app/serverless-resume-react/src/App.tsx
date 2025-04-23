import Header from "./components/Header/Header";
import VisitorCounter from "./components/VisitorCounter/VisitorCounter";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";

function App() {
  return (
    <div>
      <Header />
      <main className="container">
        <About />
        <Skills />
        <Projects />
        <VisitorCounter />
      </main>
    </div>
  );
}

export default App;
