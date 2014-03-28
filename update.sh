rm -rf -- deploy
cp -r ../kratank deploy
if (true)
then
	for f in `ls deploy/lib/impact/*`
	do
		myfile=$(basename $f)
		jspath="deploy/lib/impact/${myfile%.*}.js"
		echo $jspath
		uglifyjs $jspath -o $jspath
	done
fi