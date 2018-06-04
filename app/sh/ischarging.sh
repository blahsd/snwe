check=$(pmset -g batt)

substring='AC'
if [ "${check/$substring}" = "$check" ] ; then
  echo false
else
  echo true
fi
