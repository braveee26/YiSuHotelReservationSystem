package com.yisusystem.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;

/**
 * @author 刘馥铭
 */
public final class JwtUtil {
    // 建议将密钥放到配置文件中
    private static final String SECRET = "smart-secret-key-07-05-KEY-SECRET-AGENT";
    private static final long EXPIRATION = 1000 * 60 * 60 * 24 * 7;
    private static final SecretKey KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    // 生成 token
    public static String generateToken(String subject, Map<String, Object> claims) {
        JwtBuilder builder = Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(KEY);

        return builder.compact();
    }

    // 解析 token
    public static Claims parseToken(String token) throws JwtException {
        return Jwts.parser()
                .verifyWith(KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // 校验 token 是否有效
    public static boolean validateToken(String token) {
        try {
            parseToken(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
