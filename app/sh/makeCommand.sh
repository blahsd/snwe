cd $HOME/Library/Application\ Support/snwe
mkdir -p command-wrappers && cd $_
echo $1 > $1.command
chmod +x $1.command
