PROTOC=node_modules/.bin/grpc_tools_node_protoc
PROTOC_GEN_TS=node_modules/.bin/protoc-gen-ts

gen:
	$(PROTOC) \
	--js_out=import_style=commonjs,binary:./src/pb \
	--grpc_out=grpc_js:./src/pb \
	-I proto proto/*.proto

	$(PROTOC) \
	--plugin=protoc-gen-ts=${PROTOC_GEN_TS} \
	--ts_out=grpc_js:./src/pb \
	-I proto proto/*.proto
