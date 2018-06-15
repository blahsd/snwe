APPDIR='/Applications/'
APP=$1

ICON=`defaults read "${APPDIR}$APP.app/Contents/Info" CFBundleIconFile|sed -e 's/\.icns$//'`

cd $HOME/Library/Application\ Support/snwe
mkdir -p app-icons && cd $_

OUTFILE="./${APP}.png"

/usr/bin/sips -s format png "${APPDIR}$APP.app/Contents/Resources/$ICON.icns" --out "$OUTFILE" > /dev/null 2>&1
