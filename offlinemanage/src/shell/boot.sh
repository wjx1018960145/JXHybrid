#! /bin/bash
CMD=$1
DEFAULT_APP_NAME=PackageOffline-0.0.1-SNAPSHOT.jar
WORK_DIR=/Users/wjx/Desktop/NginxServer
APP_NAME=${2-$DEFAULT_APP_NAME}
cd $WORK_DIR
APP_COUNT=`ls -l | grep $APP_NAME | wc -l`

if [[ $1 = "" ]]; then
	echo "请输入具体命令"
    exit
fi

if [[ $APP_COUNT == 0 ]]; then
    echo "请检查$DEFAULT_APP_NAME是否存在"
    exit
fi

function status(){
	count=`ps -ef |grep java|grep $APP_NAME|grep -v grep|wc -l`
    if [ $count != 0 ];then
        echo "$APP_NAME is running..."
    else
        echo "$APP_NAME is not running..."
    fi
}

function start(){
	count=`ps -ef |grep java|grep $APP_NAME|grep -v grep|wc -l`
    if [ $count != 0 ];then
        echo "$APP_NAME already run..."
    else
        nohup java -jar -Dspring.profiles.active=prod $APP_NAME >log.txt 2>&1 &
        echo "Start $APP_NAME success..."
    fi
}

function stop(){
    boot_id=`ps -ef |grep java|grep $APP_NAME|grep -v grep|awk '{print $2}'`
    count=`ps -ef |grep java|grep $APP_NAME|grep -v grep|wc -l`

    if [ $count != 0 ];then
        kill -9 $boot_id
        echo "Stop $APP_NAME success..."
    else
    	echo "$APP_NAME is not running..."
    fi
}

function restart(){
	stop
	sleep 2
	start
	echo "$APP_NAME restart successful"
}

case $CMD in
	status )
		status;;
	start )
		start;;
	stop )
		stop;;
	restart )
		restart;;
	* )
		echo "这个命令 不是很ok"
esac
