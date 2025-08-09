# IDE Compile Tasks Issue Analysis

## Current tasks from user prompt:

- Investigate why IDE executes "Executing pre-compile tasks" and "Executing post-compile tasks" when closing and reopening the window

## Plan (simple):

1. Check Maven configuration for annotation processors (Lombok, MapStruct)
2. Examine IDE configurations that might trigger automatic compilation
3. Check Spring Boot DevTools configuration
4. Analyze build lifecycle triggers

## Steps:

1. ✅ Read project structure and main configuration files
2. 🔄 Check for IDE-specific configurations (.idea, .vscode)
3. 🔄 Analyze Maven plugins and annotation processors
4. 🔄 Check DevTools configuration impact
5. 🔄 Provide recommendations to optimize IDE behavior

## Things done:

- ✅ Read pom.xml and identified Maven compiler plugin with annotation processors (Lombok, MapStruct)
- ✅ Read application.yml and config.properties
- ✅ Identified Spring Boot DevTools dependency
- ✅ Checked for IDE-specific configurations (none found)
- ✅ Analyzed MapStruct annotation processor generating UserMapperImpl.java
- ✅ Found generated code in target/generated-sources/annotations/

## Root Cause Analysis:

### Primary causes of pre/post-compile tasks:

1. **MapStruct Annotation Processor**: Configured in maven-compiler-plugin with annotationProcessorPaths
2. **Lombok Annotation Processor**: Also configured in the same plugin
3. **Spring Boot DevTools**: Enables automatic restart and hot reload features
4. **Generated Sources**: MapStruct generates UserMapperImpl.java during compilation

### Why it happens on IDE restart:

- IDE detects changes in source files or configuration
- Annotation processors need to run to regenerate implementation classes
- MapStruct processor generates UserMapperImpl from UserMapper interface
- DevTools monitors for changes and triggers recompilation

## Solutions and Recommendations:

### Option 1: Disable DevTools (Fastest solution)

- Comment out spring-boot-devtools dependency in pom.xml
- Reduces automatic compilation triggers
- Trade-off: Lose hot reload capability

### Option 2: Configure IDE annotation processing

- Enable "Build project automatically" in IDE settings
- Configure "Build annotation processors" to run in background
- Reduces startup compilation time

### Option 3: Optimize annotation processor configuration

- Add incremental compilation support
- Configure processor to skip unchanged files

### Option 4: IDE-specific optimizations

- Increase IDE memory allocation
- Configure parallel compilation
- Exclude target/ folder from indexing

## Recommended Solution:

Keep current configuration but optimize IDE settings for better performance with annotation processors.
