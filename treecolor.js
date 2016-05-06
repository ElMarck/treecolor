window.onload = function () {
	var trees = document.querySelectorAll("code[data-lang]");
	[].forEach.call(trees, function(tree) {
		tree.TreeColor();
	});
}
HTMLElement.prototype.TreeColor = function(){
	code = this.innerHTML;
	lang = TreeLang[this.getAttribute('data-lang')];
	for(var i = 0; i < lang.length ; i++){
		code = code.replace(new RegExp(lang[i].regex), lang[i].out);
	}
	code = code.replace(new RegExp(/#(\w+);/gm), '<span class="tree-$1">');
	code = code.replace(new RegExp(/#;/gm), '</span>');
	code = code.trim();
	lines = code.match(/\n/g).length + 1;
	line = "";
	for (var i = 0; i < lines; i++) {
		line = line + '<span></span>'
	};
	this.setAttribute("data-tree", "");
	this.innerHTML = '<div class="tree-cn">' + '<div class="tree-lines">' + line + '</div>' + '<div class="tree-code">' + code + '</div>' +'</div>';

}
TreeLang = {
	unity:[
		{
			'regex':/("|')(.*?)\1/g,
			'out':'#orange;$&#;'
		},
		{
			'regex':/\s[-+]?\d*[.,]?\d+f?\b/g,
			'out':'#orange;$&#;'
		},
		{
			'regex':/\b(class|struct)\b(\s)\b(\w+)\b/g,
			'out':'$1$2#blue;$3#;'
		},
		{
			'regex':/:(\s)([^{]+)/g,
			'out':':$1#blue;$2#;'
		},
		{
			'regex':/\b(abstract|add|alias|ascending|as|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|double|do|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|foreach|for|from|get|global|goto|group|if|implicit|int|interface|internal|into|in|is|join|let|lock|long|namespace|new|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|try|typeof|uint|unchecked|ulong|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield|null|true)\b/g,
			'out':'#cian;$&#;'
		},
		{
			'regex':/\b(Debug)\b/g,
			'out':'#blue;$&#;'
		},
		{
			'regex':/\/\*[\s\S]*?\*\/|(\/\/)[\s\S]*?$/gm,
			'out':'#gray;$&#;'
		}
	]
}