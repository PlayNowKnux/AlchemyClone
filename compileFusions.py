recipes = []
class Recipe:
    def __init__(self, el1, el2, result) -> None:
        self.el1 = el1
        self.el2 = el2
        self.result = list(result)
    def parse(self):
        ans = "new Fusion(\"" + self.el1 + "\", \"" + self.el2 + "\", " + str(self.result) + "),\n"
        return ans
with open("fusions.txt", "r") as f:
    for i in f.read().split("\n"):
        ls = i.replace(" ", "").split("=")[0].split("+")
        rs = i.replace(" ", "").split("=")[1].split("&")
        recipes.append(Recipe(ls[0], ls[1], rs))
fstr = "fusions = [\n"
for i in recipes:
    fstr += i.parse()
fstr += "]"
with open("fusions.js", "w") as f:
    f.write(fstr)

