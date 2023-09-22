if [ "$#" -eq 0 ]; then
	echo "No arguments supplied"
else
	for arg_list in "$@"; do
		new_filedir="ex$arg_list"
		mkdir "$new_filedir"
	done
fi
