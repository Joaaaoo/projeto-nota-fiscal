FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Criar pasta Data e garantir permissões
RUN mkdir -p /app/Data && chown -R app:app /app/Data

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["EstoqueService/EstoqueService.csproj", "EstoqueService/"]
RUN dotnet restore "./EstoqueService/EstoqueService.csproj"
COPY . .
WORKDIR "/src/EstoqueService"
RUN dotnet build "./EstoqueService.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./EstoqueService.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# Copiar a pasta Data para o container
COPY --chown=app:app EstoqueService/Data /app/Data
ENTRYPOINT ["dotnet", "EstoqueService.dll"]