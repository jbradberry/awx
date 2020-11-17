#!/bin/bash
set +x

if [[ "$OS" ==  *"Docker Desktop"* ]]; then
    export SDB_NOTIFY_HOST='docker.for.mac.host.internal'
else
    export SDB_NOTIFY_HOST=$(ip route | head -n1 | awk '{print $3}')
fi

bootstrap_development.sh

cd /awx_devel
# Start the services
exec tini -- make supervisor
