package com.br.diegoformentin.gestaoatendimentoapp.config;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
//@EnableWebSecurity
@RequiredArgsConstructor
public class CorsConfig implements WebMvcConfigurer {
    private final JwtAuthorizationFilter jwtAuthorizationFilter;
    private final CustomUserDetailsService userDetailsService;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Aplica a todas as rotas da API
                .allowedOrigins("http://localhost:4200") // Permite requisições desta origem (seu frontend Angular)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Métodos HTTP permitidos
                .allowedHeaders("*") // Permite todos os cabeçalhos
                .allowCredentials(true) // Se você precisa lidar com cookies de autenticação em requisições cross-origin
                .maxAge(3600); // Tempo máximo (em segundos) que o navegador pode cachear as configurações CORS
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(new AntPathRequestMatcher("/user/login", "POST")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/user/register", "POST")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/funcionario/**", "GET")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/funcionario/register", "POST")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/funcionario/update", "PUT")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/funcionario/redefirsenha", "PUT")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/cliente/**", "GET")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/cliente/register", "POST")).permitAll()
                        .anyRequest().authenticated()
                )
                .userDetailsService(userDetailsService)
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
}