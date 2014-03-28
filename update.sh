rm -rf -- live
cp -r ../kratank live
if (true)
then
	for f in `ls live/lib/impact/*`
	do
		myfile=$(basename $f)
		jspath="live/lib/impact/${myfile%.*}.js"
		echo $jspath
		uglifyjs $jspath -o $jspath
	done
fi