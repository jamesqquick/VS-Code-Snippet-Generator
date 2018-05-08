const formattedInput = document.getElementById('formattedInput');
const snippetBody = document.getElementById('snippetBody');
const snippetName = document.getElementById('snippetName');
const snippetPrefix = document.getElementById('snippetPrefix');
const snippetDescription = document.getElementById('snippetDescription');
const copyBtn = document.getElementById('copyBtn');
const tabStopBtn = document.getElementById('tabStopBtn');

let tabStops = 1;

snippetName.value = 'name';
snippetPrefix.value = 'prefix';
snippetDescription.value = 'Here is my super cool description';
snippetBody.value = `<html>
	<body>
	</body>
</html>`;

let snippet = {};
const updateSnippetOutput = () => {
	formattedInput.value = `"${snippetName.value}": {
	"prefix":"${snippetPrefix.value}",
	"body": [
		${formatSnippetBody(snippetBody.value)}
	],
	"description":"${snippetDescription.value}"
}`;
};

const formatSnippetBody = body => {
	const bodyArray = body.split('\n');
	return bodyArray
		.map((line, index) => {
			const formattedLine = line.replace(/"/g, '\\"');
			return ` ${index !== 0 ? '\t\t' : ''}"${formattedLine}"${
				index !== bodyArray.length - 1 ? ',\n' : ''
			}`;
		})
		.join('');
};

snippetName.addEventListener('keyup', updateSnippetOutput);
snippetPrefix.addEventListener('keyup', updateSnippetOutput);
snippetDescription.addEventListener('keyup', updateSnippetOutput);

snippetBody.addEventListener('keyup', updateSnippetOutput);

tabStopBtn.addEventListener('click', e => {
	const start =
		snippetBody.selectionStart !== 0
			? snippetBody.selectionStart
			: snippetBody.value.length - 1;
	snippetBody.value =
		snippetBody.value.substring(0, start) +
		`$${tabStops}` +
		snippetBody.value.substring(start, snippetBody.value.length);
	tabStops++;
});

copyBtn.addEventListener('click', e => {
	formattedInput.select();
	document.execCommand('copy');
	copyBtn.value = 'Snippet Copied!';
	setTimeout(() => {
		copyBtn.value = 'Copy Snippet';
	}, 1000);
});

updateSnippetOutput();
