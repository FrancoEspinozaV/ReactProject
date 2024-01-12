import { Toaster } from "sonner";
import { CreateNewUser } from "./component/AddUser";
import { ListOfUser } from "./component/ListOfUser";

function App() {
	return (
		<main style={{ margin: "10px" }}>
			<ListOfUser />
			<CreateNewUser />
			<Toaster richColors />
		</main>
	);
}

export default App;
