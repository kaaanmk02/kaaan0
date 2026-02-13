packages=(
express
axios
typescript
multer
fs-extra
xml2js
open
rimraf
body-parser
cookie
debug
mime-types
qs
send
serve-static
router
tar
glob
commander
kleur
lru-cache
minimist
mkdirp
once
which
wrappy
yallist
)

for pkg in "${packages[@]}"; do
  echo "Installing $pkg ..."
  npm install "$pkg"
done

echo "All packages installed."

mkdir images
mv *.jpg images/
