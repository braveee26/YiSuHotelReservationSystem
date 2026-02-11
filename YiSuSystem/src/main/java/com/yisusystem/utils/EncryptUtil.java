package com.yisusystem.utils;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

/**
 * 密码工具类
 * @author liufuming
 * @since 2026-02-05
 */
public final class EncryptUtil {
    private static final String SECRET_KEY= "MR5GGNJSGB4XC6I=";
    private static final String AES_ALGORITHM = "AES/ECB/PKCS5Padding";

    /**
     * 生成随机盐值
     * @return Base64编码的随机盐值
     * @apiNote 使用SecureRandom生成16字节的随机盐值，用于密码加密
     */
    public static String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }

    /**
     * 使用SHA-256算法加密
     * @param origin 原始值
     * @param salt 盐值
     * @return 加密后的值（Base64编码）
     * @throws RuntimeException 当哈希算法不可用时抛出异常
     * @apiNote 使用盐值和SHA-256算法对输入进行加密，返回Base64编码的结果
     */
    public static String hash(String origin, String salt) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(Base64.getDecoder().decode(salt));
            byte[] hashed = md.digest(origin.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hashed);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing origin", e);
        }
    }

    /**
     * 验证加密是否匹配
     *
     * @param origin 原先值
     * @param salt   盐值
     * @param hashed 加密信息
     * @return 如果正确返回true，否则返回false
     * @apiNote 使用盐值和SHA-256算法验证输入和加密后的值是否匹配
     */
    public static Boolean verify(String origin, String salt, String hashed) {
        String hashedInput = hash(origin, salt);
        return hashedInput.equals(hashed);
    }

    /**
     * 加密身份证
     */
    public static String encryptIdCard(String idCard) {
        return idCard.substring(0, 6) + encryptAES(idCard.substring(6));
    }

    /**
     * 验证身份证信息是否匹配
     * @param idCard 原始身份证号码
     * @param encryptedIdCard 加密后的身份证号码
     * @return 如果匹配返回true，否则返回false
     */
    public static Boolean verifyIdCard(String idCard, String encryptedIdCard) {
        String expectedEncrypted = encryptAES(idCard);
        return expectedEncrypted.equals(encryptedIdCard);
    }

    /**
     * 解密身份证号码
     * @param encryptedIdCard 加密后的身份证号码
     * @return 解密后的身份证号码
     */
    public static String decryptIdCard(String encryptedIdCard) {
        String decrypted = decryptAES(encryptedIdCard.substring(6));
        return encryptedIdCard.substring(0, 6) + decrypted;
    }

    /**
     * AES加密方法
     * @param data 需要加密的数据
     * @return Base64编码的加密结果
     */
    static String encryptAES(String data) {
        try {
            SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, key);
            byte[] encrypted = cipher.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new RuntimeException("加密失败", e);
        }
    }

    /**
     * AES解密方法
     * @param data 需要解密的数据（Base64编码）
     * @return 解密后的字符串
     */
    static String decryptAES(String data) {
        try {
            SecretKeySpec key = new SecretKeySpec(SECRET_KEY.getBytes(), "AES");
            Cipher cipher = Cipher.getInstance(AES_ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, key);
            byte[] decodedData = Base64.getDecoder().decode(data);
            byte[] decrypted = cipher.doFinal(decodedData);
            return new String(decrypted, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("解密失败", e);
        }
    }
}
