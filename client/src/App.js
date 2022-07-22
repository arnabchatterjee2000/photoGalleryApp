import './App.css';
import InfoBar from './components/InfoBar/InfoBar';
import NavBar from './components/NavBar/NavBar';
import Routes from './components/Routes/Routes';

function App() {
	return (
		<div className='App'>
			<NavBar />
			<Routes />
			<InfoBar />
		</div>
	);
}

export default App;
