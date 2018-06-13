# $1 = commandName    # what gets displayed and name of the .command file
# $2 = commandContent # what actually gets run

cd $HOME/Library/Application\ Support/snwe
mkdir -p command-wrappers && cd $_
echo $2 > $1.command
chmod +x $1.command
