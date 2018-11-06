var huffman = {
	codes: {},
	frequency: function(str) {
		var freqs = {}
		for (var i = 0; i < str.length; i++) {
			freqs[str[i]] = (str[i] in freqs) ? freqs[str[i]] + 1 : 1
		}

		return freqs
	},
	sortfreq: function(freqs) {
		var letters = []
		for (var ch in freqs) {
			letters.push([freqs[ch],ch])
		}

		return letters.sort()
	},
	buildtree: function(letters) {
		while (letters.length > 1) {
			var leasttwo = letters.slice(0,2)
			var therest = letters.slice(2,letters.length)
			var combfreq = letters[0][0] + letters[1][0]
			var two = [combfreq,leasttwo]
			letters = therest
			letters.push(two)
			letters.sort()
		}

		return letters[0]
	},
	trimtree: function(tree) {
		var p = tree[1]
		if (typeof p === 'string') {
			return p
		} else {
			return (Array(this.trimtree(p[0]),this.trimtree(p[1])))
		}
	},
	assigncodes: function(node, pat) {
		pat = pat || "";
		if (typeof(node) == typeof("")) {
			this.codes[node] = pat;
		} else {
			this.assigncodes(node[0], pat+"0")
			this.assigncodes(node[1], pat+"1")
		}

		return this.codes
	},
	encode: function(str) {
		this.codes = {}
		this.assigncodes(this.trimtree(this.buildtree(this.sortfreq(this.frequency(str)))))
		var output = ""
		for (var i = 0; i < str.length; i++) {
			output = output + this.codes[str[i]]
		}

		return output
	},
	decode: function(tree, str) {
		var output = ""
		var p = tree
		for (var i = 0; i < str.length; i++) {
			if(str[i] == '0') {
				p = p[0]
			} else {
				p = p[1]
			}
			if (typeof p === 'string') {
				output = output +p
				p = tree
			}
		}

		return output
	}
}

enstring = "volbil"
encoded = huffman.encode(enstring)
tree = huffman.trimtree(huffman.buildtree(huffman.sortfreq(huffman.frequency(enstring))))

console.log("Encoded:", encoded)
console.log("Decoded:", huffman.decode(tree, encoded))
