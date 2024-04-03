import app from "./app";

const port: number = 3000;
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
