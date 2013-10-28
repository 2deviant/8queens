COMPILER=gcc
OPTIONS=-Wall -O3
FILES=8queens
all:
	for i in $(FILES); do \
		$(COMPILER) $(OPTIONS) $$i.c -o $$i ; \
		echo Compiling $$i.c ... ; \
	done
clean:
	- rm *~
	- rm $(FILES)
